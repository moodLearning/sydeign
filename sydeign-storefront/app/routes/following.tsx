import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '../data/AuthContext';
import type { Designer } from '../data/shopify';

function formatFollowerCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`;
  }
  return String(count);
}

export default function FollowingPage() {
  const { token, isLoggedIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn || !token) {
      navigate('/?auth=login');
      return;
    }

    let cancelled = false;

    const fetchFollowing = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/following-designers', {
          headers: { Authorization: token },
        });
        const data = (await response.json()) as { designers?: Designer[]; error?: string };
        if (!response.ok) throw new Error(data.error || 'Failed to load your following list');
        if (!cancelled) setDesigners(data.designers ?? []);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFollowing();

    return () => {
      cancelled = true;
    };
  }, [token, isLoggedIn, authLoading, navigate]);

  const filteredDesigners = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return designers.filter((designer) => designer.name.toLowerCase().includes(query));
  }, [designers, searchQuery]);

  function handleUnfollow(designerId: string) {
    setDesigners((prev) => prev.filter((designer) => designer.id !== designerId));
  }

  if (authLoading || loading) {
    return <div className="p-12 text-center text-[#4B6B40] font-medium">Loading your following list...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#4B6B40] mb-8">Following</h1>

        <div className="relative max-w-md mb-10">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4B6B40]/30"
          />
        </div>

        {filteredDesigners.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            {designers.length === 0
              ? "You're not following any designers yet."
              : 'No matching designers found.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredDesigners.map((designer) => (
              <FollowingDesignerCard
                key={designer.id}
                designer={designer}
                onUnfollow={handleUnfollow}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function FollowingDesignerCard({
  designer,
  onUnfollow,
}: {
  designer: Designer;
  onUnfollow: (designerId: string) => void;
}) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleUnfollow() {
    if (loading || !token) return;
    setLoading(true);
    try {
      const response = await fetch('/api/follow-designer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ designerMetaobjectId: designer.id, action: 'unfollow' }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || 'Failed to unfollow designer');
      onUnfollow(designer.id);
    } catch (err) {
      console.error('Failed to unfollow designer:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link
      to={`/designers/${designer.handle}`}
      className="flex flex-col items-center text-center bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border border-stone-200 mb-3">
        <img
          src={designer.profileImage}
          alt={designer.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-stone-800 line-clamp-1">{designer.name}</h3>
      <p className="text-xs text-stone-500 mb-4">
        {formatFollowerCount(designer.followers ?? 0)} Followers
      </p>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleUnfollow();
        }}
        disabled={loading}
        className="px-6 py-1.5 rounded-md bg-[#c36a3e] text-white text-xs font-bold uppercase tracking-wide hover:bg-[#b05c32] transition disabled:opacity-50"
      >
        Following
      </button>
    </Link>
  );
}
