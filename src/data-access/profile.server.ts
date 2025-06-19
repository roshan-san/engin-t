import { db } from "@/lib/db";
import {profiles } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { userRequiredMiddleware } from "@/features/authentication/auth.middleware";

const profileInsertSchema = createInsertSchema(profiles);

export const getMyProfileFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .handler(
        async ({context}) => {
            const [profile] = await db.select().from(profiles).where(eq(profiles.id, context.userSession.user.id)).limit(1);
            return profile;
        }
    )

export const createProfileFn = createServerFn()
    .validator(profileInsertSchema)
    .handler(async ({ data }) => {
        await db.insert(profiles).values(data);
    })

    
export const checkUsernameExistsFn = createServerFn()
    .validator(z.object({username:z.string()}))
    .handler(
        async ({data,context}) => {
            const profile = await db.query.profiles.findFirst({
                where: eq(profiles.username, data.username)
            });
            return !!profile;
        }
    ) 
