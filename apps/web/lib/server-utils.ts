import 'server-only'
import { headers } from "next/headers"
import { auth } from "@workspace/auth/lib/auth"
import { forbidden, redirect } from "next/navigation"
import { routes } from "@workspace/common/routes"
import { cache } from "react"
import { user as userRole, admin as adminRole, type RoleName, type Permission } from "@workspace/auth/lib/permissions"

type GetSafeAuthSessionOptions = {
    /**
     * Required role(s) for the user. Can be a single role string or an array of roles.
     * If provided, the user must have one of the specified roles.
     */
    requiredRole?: RoleName | RoleName[]
    /**
     * Required permission for the user. Must be in the format "resource:action" (e.g., "user:read").
     * If provided, the user's role must have this permission.
     * Type-safe: only valid permissions from your access control configuration are allowed.
     */
    requiredPermission?: Permission
}

export const getSafeAuthSession = cache(async (options: GetSafeAuthSessionOptions = {}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect(routes.web.auth.SignIn)

    const userRoleName = (session.user.role ?? "user") as RoleName

    // Check required role
    if (options.requiredRole) {
        const requiredRoles = Array.isArray(options.requiredRole)
            ? options.requiredRole
            : [options.requiredRole]

        if (!requiredRoles.includes(userRoleName)) forbidden()
    }

    // Check required permission
    if (options.requiredPermission) {
        const [resource, action] = options.requiredPermission.split(":")

        if (!resource || !action) {
            throw new Error(`Invalid permission format. Expected "resource:action", got: ${options.requiredPermission}`)
        }

        // Get the role definition based on user's role
        const roleDefinition = userRoleName === "admin" ? adminRole : userRole

        // Check if the role has the required permission using authorize
        try {
            const request = { [resource]: action } as Record<string, string>
            const result = roleDefinition.authorize(request)

            if (!result) forbidden()
        } catch {
            forbidden()
        }
    }

    return session
})