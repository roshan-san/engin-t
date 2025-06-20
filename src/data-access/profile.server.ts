import { db } from "@/lib/db";
import {profiles } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";
import { userRequiredMiddleware } from "@/features/authentication/auth.middleware";
import { OnboardingDataSchema } from "./profile.schema";

export const getMyProfileFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .handler(
        async ({context}) => {
            const [profile] = await db.select().from(profiles).where(eq(profiles.id, context.userSession.user.id)).limit(1);
            return profile;
        }
    )

export const createProfileFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .validator(OnboardingDataSchema)
    .handler(async ({ data ,context}) => {
        console.log("server function")
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

export const logFn = createServerFn()
    .middleware([userRequiredMiddleware])
    .handler(
        async ({context}) => {
            const profile=await db.select().from(profiles).limit(1)
            console.log(context.userSession.user)
            console.log(profile)
        }
    )
