import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { startups } from "@/lib/db/tables/startups";
import { createServerFn } from "@tanstack/react-start";
import {userRequiredMiddleware } from "@/features/authentication/auth.middleware";
import { createInsertSchema } from "drizzle-zod";

export const getMyStartupsFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .handler(
        async ({ data, context }) => {
            const myStartups = await db.select().from(startups).where(eq(startups.founderId, context.userSession.user.id))
            return myStartups
        }
    )
const StartupInsertSchema = createInsertSchema(startups)
export const createStartupFn = createServerFn()
    .validator(StartupInsertSchema)
    .middleware([userRequiredMiddleware])
    .handler(
        async ({ data, context }) => {
            const newStartup = await db.insert(startups).values({
                ...data,
                founderId: context.userSession.user.id,
            }).returning();
            return newStartup[0];
        }
    );
