import { env } from "@workspace/auth/env"
import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { ac as accessControl, user as userRole, admin as adminRole } from "@workspace/auth/lib/permissions"

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_AUTH_URL,
    plugins: [
        adminClient({
            ac: accessControl,
            roles: {
                admin: adminRole,
                user: userRole
            }
        })
    ]
})

export const { useSession, signOut } = authClient