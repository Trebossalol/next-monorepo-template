import 'server-only'
import { auth } from '@workspace/auth/lib/auth'
import { headers } from 'next/headers'
import { getSafeAuthSession } from '@/lib/server-utils'
import type { AccountSessionDto } from '@/types/dto/account/account-sessions-dto'

export const getAccountSessions = async (): Promise<AccountSessionDto[]> => {
	await getSafeAuthSession()

	const sessions = await auth.api.listSessions({
		headers: await headers()
	})

	return sessions
}
