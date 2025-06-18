import { auth } from "@/lib/auth"
import { createMiddleware, createServerFn, json } from "@tanstack/react-start"
import { getWebRequest } from "@tanstack/react-start/server"


export const getUserSessionFN = createServerFn({ method: "GET" }).handler(async () => {
  const request = getWebRequest()
  return request?.headers ? auth.api.getSession({ headers: request.headers }) : null
})

export const authMiddleware = createMiddleware({ type: "function" })
  .server(async ({ next }) => next({ context: { userSession: await getUserSessionFN() } }))

export const protectedRoute = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    if (!context.userSession) {
      throw json({ message: "You must be logged in to do that!" }, { status: 401 })
    }
    return next()
  })
