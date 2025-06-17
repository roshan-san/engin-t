import { db } from '@/db';
import { startups } from '@/db/tables/startups';
import { createServerFn } from '@tanstack/react-start'
import { desc, ilike, or } from 'drizzle-orm';

interface SearchParams {
  searchQuery?: string;
  page?: number;
}

export const searchStartupsFn = createServerFn({
  method: 'GET',
})
  .validator((data: SearchParams) => data)
  .handler(async (ctx) => {
    const { searchQuery = '', page = 0 } = ctx.data;
    const from = page * 10;
    const to = from + 10 - 1;

    const query = db
      .select()
      .from(startups)
      .limit(10)
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
  });
