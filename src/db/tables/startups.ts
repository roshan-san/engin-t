import { index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const startups = pgTable("startups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  description: text("description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  teamSize: integer("team_size"),
  patent: text("patent"),
  funding: integer("funding"),
  founderId: uuid("founder_id").references(() => profiles.id).notNull(),
  created_at: timestamp("created_at").defaultNow(),
}, (table) => [
  index("startups_id_idx").on(table.id),
]);

export type Startup = typeof startups.$inferSelect
export type StartupInsert = typeof startups.$inferInsert