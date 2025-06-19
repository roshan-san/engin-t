import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./auth.middleware";

export const getUserIdFn = createServerFn()
        .middleware([authMiddleware])
        .handler(async ({context}) => {
            return context?.user?.id
        
    })
