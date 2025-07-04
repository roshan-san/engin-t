import { index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const startups = pgTable("startups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  description: text("description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  team_size: integer("team_size"),
  patent: text("patent").default("NA").notNull(),
  funding: integer("funding").default(0).notNull(),
  founderId: text("founder_id").references(() => profiles.id).notNull(),
  created_at: timestamp("created_at").defaultNow(),
}, (table) => [
  index("startups_id_idx").on(table.id),
]);

export type Startup = typeof startups.$inferSelect
export type StartupInsert = typeof startups.$inferInsert