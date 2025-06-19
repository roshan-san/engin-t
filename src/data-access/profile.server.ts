import { db } from "@/lib/db";
import {profiles } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";
import { createInsertSchema } from "drizzle-zod";

const profileInsertSchema = createInsertSchema(profiles);

export const getMyProfileByIdFn = createServerFn()
    .validator(z.object({
        userId: z.string()
    }))
    .handler(
        async ({ data }) => {
              return await db.select().from(profiles).where(eq(profiles.id, data.userId))
        }
    )
export const createProfileFn = createServerFn()
    .validator(profileInsertSchema)
    .handler(async ({ data }) => {
        await db.insert(profiles).values(data);
    })

    
export async function checkUsernameExists(username: string): Promise<boolean> {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.username, username)
    });
    return !!profile;
}
