import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const GetMyProfileFN = createServerFn().handler(async () => {
    try {
        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.id, "123")
        });
        return profile;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
})

