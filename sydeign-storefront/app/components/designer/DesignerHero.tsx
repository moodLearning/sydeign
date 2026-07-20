import React, { useState, useEffect } from 'react';
import type { Designer } from '../../data/shopify';
/*import {SocialLinks} from './SocialLinks';*/

async function getCustomerFollowing(): Promise<string[]> {
  const token = localStorage.getItem('shopify_customer_token');
  if (!token) return [];

  const query = `
    query GetFollowing {
      customer {
        metafield(namespace: "custom", key: "following_designers") {
          value
        }
      }
    }
  `;

  try {
    const response = await fetch('https://shopify.com/77132071069/account/api/2026-07/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'Authorization': token,
      },
      body: query,
    });
    
    const result = (await response.json()) as { data?: { customer?: { metafield?: { value?: string } } } };
    const rawValue = result.data?.customer?.metafield?.value;
    return rawValue ? (JSON.parse(rawValue) as string[]) : [];
  } catch (err) {
    console.error("Error checking following state:", err);
    return [];
  }
}

async function updateCustomerFollowing(followingList: string[]) {
  const token = localStorage.getItem('shopify_customer_token');
  const customerId = localStorage.getItem('shopify_customer_id');
  if (!token || !customerId) return;

  const query = `
    mutation UpdateFollowing {
      metafieldsSet(metafields: [
        {
          ownerId: "${customerId}"
          namespace: "custom"
          key: "following_designers"
          value: "${JSON.stringify(followingList).replace(/"/g, '\\"')}"
          type: "list.single_line_text_field"
        }
      ]) {
        metafields {
          key
        }
        userErrors {
          message
        }
      }
    }
  `;

  await fetch('https://shopify.com/77132071069/account/api/2026-07/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': token,
    },
    body: query,
  });
}

// --- React Components ---

interface DesignerHeroProps {
  designer: Designer;
}

export function DesignerHero({ designer }: DesignerHeroProps) {
  return (
    <section className="border-b border-stone-200/40 bg-background pb-12">
      <DesignerBanner designer={designer} />
      <DesignerProfile designer={designer} />
    </section>
  );
}

interface DesignerBannerProps {
  designer: Designer;
}

function DesignerBanner({ designer }: DesignerBannerProps) {
  return (
    <div className="relative z-10 h-[240px] w-full bg-stone-900 md:h-[300px]">
      <img
        src={
          designer.bannerImage ??
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600'
        }
        alt="Designer Workspace Background"
        className="h-full w-full object-cover opacity-60 blur-[0.5px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/20" />
      <div className="absolute -bottom-16 left-1/2 z-30 -translate-x-1/2">
        <div className="relative h-36 w-36 rounded-full bg-[#fcfdfa] p-2 shadow-xl md:h-44 md:w-44">
          <div className="pointer-events-none absolute inset-0 z-40 rounded-full border-4 border-[#d1a153] opacity-90" />
          <img
            src={designer.profileImage ?? '/placeholder-designer.png'}
            alt={designer.name}
            className="relative z-30 h-full w-full rounded-full object-cover"
          />
          {/*<div className="absolute -right-4 bottom-2 z-40 rounded-sm border border-[#d1a153]/30 bg-[#445c49] px-2.5 py-1 font-sans text-md uppercase tracking-widest text-white shadow-md">
            Designer
          </div>*/}
        </div>
      </div>
    </div>
  );
}

interface DesignerProfileProps {
  designer: Designer;
}

function DesignerProfile({ designer }: DesignerProfileProps) {

  const initialCount = typeof designer.followers === 'number'
    ? designer.followers
    : parseInt(String(designer.followers || '0').replace(/[^0-9]/g, ''), 10) || 0;

  const [followerCount, setFollowerCount] = useState(initialCount);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="relative z-20 mx-auto mt-20 max-w-5xl px-6 text-center">
      
      <FollowButton 
        designerId={designer.id} 
        isFollowing={isFollowing} 
        setIsFollowing={setIsFollowing} 
        setFollowerCount={setFollowerCount} 
      />

      <h1 className="section-header font-cinzel">
        {designer.name}
      </h1>

      <DesignerRating designer={designer} />

      <DesignerMetrics designer={designer} followerCount={followerCount} />

      <p className="section-body">
        {designer.bio}
      </p>
    </div>
  );
}

interface FollowButtonProps {
  designerId: string;
  isFollowing: boolean;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}

function FollowButton({ designerId, isFollowing, setIsFollowing, setFollowerCount }: FollowButtonProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomerFollowing().then((followingList) => {
      setIsFollowing(followingList.includes(designerId));
    });
  }, [designerId, setIsFollowing]);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem('shopify_customer_token');
    if (!token) {
      alert("Please sign in to follow designers.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const currentList = await getCustomerFollowing();
      const alreadyFollowing = currentList.includes(designerId);

      const updatedList = alreadyFollowing
        ? currentList.filter((id) => id !== designerId)
        : [...currentList, designerId];

      setIsFollowing(!alreadyFollowing);
      setFollowerCount((prev) => alreadyFollowing ? Math.max(0, prev - 1) : prev + 1);

      await Promise.all([
        updateCustomerFollowing(updatedList),
        fetch('/api/follow-designer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            designerMetaobjectId: designerId,
            action: alreadyFollowing ? 'unfollow' : 'follow',
          }),
        })
      ]);

    } catch (err) {
      console.error("Failed to process follow change:", err);
      setIsFollowing(isFollowing);
      setFollowerCount((prev) => isFollowing ? prev + 1 : Math.max(0, prev - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleFollowToggle}
        disabled={loading}
        type="button"
        className={`
          cursor-pointer
          rounded-full
          border
          px-6
          py-1.5
          font-sans
          text-lg
          font-semibold
          uppercase
          tracking-widest
          transition-all
          ${isFollowing 
            ? 'bg-[#c36a3e] border-[#c36a3e] text-white hover:opacity-90' 
            : 'border-[#c36a3e] text-[#c36a3e] hover:bg-[#c36a3e] hover:text-white'
          }
          disabled:opacity-50
        `}
      >
        {loading ? 'Processing...' : isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

interface DesignerInfoProps {
  designer: Designer;
}

function DesignerRating({ designer }: DesignerInfoProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-1.5 text-[#c36a3e]">
      <span className="text-xl">
        ★★★★★
      </span>
      <span className="ml-1 font-sans text-lg font-semibold tracking-wider text-stone-500">
        {designer.handle || '@designer'}
      </span>
      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-[2px] text-[10px] text-emerald-700">
        ✔
      </span>
    </div>
  );
}

interface DesignerMetricsProps extends DesignerInfoProps {
  followerCount: number;
}

function DesignerMetrics({ designer, followerCount }: DesignerMetricsProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 font-sans text-lg font-semibold uppercase tracking-wider text-stone-600">
      <span>
        {designer.products || '84 Designs'}
      </span>
      <span className="text-[10px] text-[#9c522b]/50">
        ✦
      </span>
      <span>
        {followerCount.toLocaleString()} Followers
      </span>
    </div>
  );
}