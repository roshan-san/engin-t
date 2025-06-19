import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { startups } from "@/lib/db/tables/startups";
import { createServerFn } from "@tanstack/react-start";
import {userRequiredMiddleware } from "@/features/authentication/auth.middleware";

export const getMyStartupsFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .handler(
        async ({ data, context }) => {
            const myStartups = await db.select().from(startups).where(eq(startups.founderId, context.userSession.user.id))
            return myStartups
        }
    )