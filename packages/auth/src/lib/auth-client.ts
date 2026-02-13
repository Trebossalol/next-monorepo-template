import { env } from '@workspace/auth/env'
import {
	ac as accessControl,
	admin as adminRole,
	user as userRole
} from '@workspace/auth/lib/permissions'
import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

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
