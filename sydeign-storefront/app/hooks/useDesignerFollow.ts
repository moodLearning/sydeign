import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../data/AuthContext';

interface FollowStateResponse {
  isFollowing: boolean;
  followerCount: number;
  error?: string;
}

export function useDesignerFollow(designerId: string, initialFollowerCount: number) {
  const { token, isLoggedIn } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [loading, setLoading] = useState(false);
  const requestSeq = useRef(0);

  useEffect(() => {
    const seq = ++requestSeq.current;
    const params = new URLSearchParams({ designerMetaobjectId: designerId });

    fetch(`/api/follow-designer?${params.toString()}`, {
      headers: token ? { Authorization: token } : undefined,
    })
      .then((res) => res.json() as Promise<FollowStateResponse>)
      .then((data) => {
        if (seq !== requestSeq.current) return;
        setIsFollowing(Boolean(data.isFollowing));
        if (typeof data.followerCount === 'number') {
          setFollowerCount(data.followerCount);
        }
      })
      .catch((err) => console.error('Failed to load follow status:', err));
  }, [designerId, token]);

  const toggleFollow = async () => {
    if (!isLoggedIn || !token) {
      alert('Please sign in to follow designers.');
      return;
    }
    if (loading) return;

    const wasFollowing = isFollowing;
    setLoading(true);
    setIsFollowing(!wasFollowing);
    setFollowerCount((prev) => (wasFollowing ? Math.max(0, prev - 1) : prev + 1));

    try {
      const response = await fetch('/api/follow-designer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          designerMetaobjectId: designerId,
          action: wasFollowing ? 'unfollow' : 'follow',
        }),
      });

      const data = (await response.json()) as FollowStateResponse;
      if (!response.ok) throw new Error(data.error || 'Failed to update follow status');

      setIsFollowing(data.isFollowing);
      setFollowerCount(data.followerCount);
    } catch (err) {
      console.error('Failed to process follow change:', err);
      setIsFollowing(wasFollowing);
      setFollowerCount((prev) => (wasFollowing ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, followerCount, loading, toggleFollow };
}
