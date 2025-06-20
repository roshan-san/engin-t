import { createAuthClient } from "better-auth/react"
export const {useSession, signIn, signOut,getSession} = createAuthClient({
    baseURL: "http://localhost:3000"
})
