import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { db } from '@/db';
import { startups } from '@/db/tables/startups';
import { ilike, or, desc } from 'drizzle-orm';
const ITEMS_PER_PAGE = 10;


async function searchStartups({ pageParam = 0, searchQuery = '' }) {
  const from = pageParam * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const query = db
    .select()
    .from(startups)
    .limit(ITEMS_PER_PAGE)
    .offset(from)
    .orderBy(desc(startups.created_at));

  if (searchQuery) {
    query.where(
      or(
        ilike(startups.name, `%${searchQuery}%`),
        ilike(startups.description, `%${searchQuery}%`)
      )
    );
  }

  const data = await query;
  return data;
}

export function useStartupSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['startups', searchQuery],
    queryFn: ({ pageParam }) => searchStartupsFn({ data: searchQuery }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    searchQuery,
    setSearchQuery,
    data,
    status,
    isFetchingNextPage,
    hasNextPage,
    ref,
  };
} 