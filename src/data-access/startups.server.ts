import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { startups } from "@/lib/db/tables/startups";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const getMyStartupsFn = createServerFn()
    .validator(z.object({
        userId: z.string()
    }))
    .handler(
        async ({ data }) => {
              return await db.select().from(startups).where(eq(startups.founderId, data.userId))
        }
    )