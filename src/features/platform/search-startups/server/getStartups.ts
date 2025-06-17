// lib/queries/useInfiniteStartups.ts
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchStartups = async ({ pageParam = null }) => {
  const res = await fetch(`/api/startups?cursor=${pageParam ?? ''}&limit=10`);
  if (!res.ok) throw new Error('Failed to fetch startups');
  return res.json();
};

export function useInfiniteStartups() {
  return useInfiniteQuery({
    queryKey: ['startups'],
    queryFn: fetchStartups,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
