import { z } from "zod"

export const UserMetaSchema = z.object({
  username: z.string().min(3).max(20),
})

export type UserMeta = z.infer<typeof UserMetaSchema>