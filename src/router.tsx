import { MutationCache, QueryClient } from "@tanstack/react-query"
import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { toast } from "sonner"
import { ZodError } from "zod"
import { routeTree } from "./routeTree.gen"

function parseZodError(error: Error) {
  try {
    return new ZodError(JSON.parse(error.message))
  } catch {}
}

function formatZodError(error: ZodError) {
  return error.errors.map(err => err.message).join(", ")
}

export function createRouter() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        if (error instanceof Error) {
          const zodError = parseZodError(error)
          if (zodError) {
            toast.error(formatZodError(zodError))
            return
          }

          toast.error(error.message)
        } else if (typeof error === "string") {
          toast.error(error)
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          toast.error((error as { message: string }).message)
        }
      },
    }),
  })

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
      defaultErrorComponent: ErrorComponent,
      defaultNotFoundComponent: () => "Not found!",
      context: { queryClient },
    }),
    queryClient,
  )

  if (process.env.LOG_DEBUG) {
    router.subscribe("onBeforeLoad", console.log)
    router.subscribe("onBeforeNavigate", console.log)
    router.subscribe("onBeforeRouteMount", console.log)
    router.subscribe("onInjectedHtml", console.log)
    router.subscribe("onLoad", console.log)
    router.subscribe("onRendered", console.log)
    router.subscribe("onResolved", console.log)
  }

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
