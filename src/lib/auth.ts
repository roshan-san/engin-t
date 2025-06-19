import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/lib/db/schema"
import { reactStartCookies } from "better-auth/react-start";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.userTable,
            account: schema.accountTable,
            session: schema.sessionTable,
            verification: schema.verificationTable,
        },
    }),
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    plugins: [reactStartCookies()],
});
    