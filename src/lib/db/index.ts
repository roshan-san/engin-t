import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  idle_timeout: 20,
  max_lifetime: 60 * 5,
});

export const db = drizzle(client, { schema });
