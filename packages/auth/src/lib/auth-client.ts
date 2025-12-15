import { env } from "@workspace/auth/env"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: env.AUTH_URL
})