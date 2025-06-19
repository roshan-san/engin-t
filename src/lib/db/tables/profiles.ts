import { index, pgTable, text, timestamp, } from "drizzle-orm/pg-core";

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  email:text("email").notNull().unique(),
  user_type: text('user_type').notNull(),
  work_type: text('work_type').notNull(),
  full_name:text("full_name").notNull(),
  bio:text("bio"),
  avatar_url:text("avatar_url").notNull(),
  location: text('location'),
  skills: text('skills').array(),
  interests: text('interests').array(),
  github_url: text('github_url'),
  linkedin_url: text('linkedin_url'),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index("profiles_id_idx").on(table.id),
]);

export type Profile = typeof profiles.$inferSelect
export type ProfileInsert = typeof profiles.$inferInsert 