import { db } from "@/lib/db";
import {ProfileInsert, profiles } from "@/lib/db/tables/profiles";
import { eq } from "drizzle-orm";

export async function getProfileById(profileId: string) {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, profileId)
    });
    return profile;
}

export async function createProfile(data:ProfileInsert){
    await db.insert(profiles).values(data);
}

export async function checkUsernameExists(username: string): Promise<boolean> {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.username, username)
    });
    return !!profile;
}
