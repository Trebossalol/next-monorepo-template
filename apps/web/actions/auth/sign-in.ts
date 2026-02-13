'use server'

import { auth } from '@workspace/auth/lib/auth'
import { routes } from '@workspace/common/routes'
import { actionClient } from '@/lib/safe-action'
import { signInSchema } from '@/schemas/auth/sign-in-schema'

export const signIn = actionClient
	.metadata({ actionName: 'signIn' })
	.inputSchema(signInSchema)
	.action(async ({ parsedInput }) => {
		await auth.api.signInEmail({
			body: {
				email: parsedInput.email,
				password: parsedInput.password,
				rememberMe: parsedInput.remember,
				callbackURL: routes.web.app.Index
			}
		})
	})
