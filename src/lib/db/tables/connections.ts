import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const connections = pgTable("connections", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id").notNull().references(() => profiles.id),
  receiverId: uuid("receiver_id").notNull().references(() => profiles.id),
  status: text("status", { enum: ["pending", "accepted","rejected"] }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Connection = typeof connections.$inferSelect;
export type ConnectionInsert = typeof connections.$inferInsert; 