import 'server-only'
import { getSafeAuthSession } from '@/lib/server-utils'
import { AccountSessionDto } from '@/types/dto/account/account-sessions-dto'
import { auth } from '@workspace/auth/lib/auth'
import { headers } from 'next/headers'

export const getAccountSessions = async (): Promise<AccountSessionDto[]> => {
    await getSafeAuthSession()

    const sessions = await auth.api.listSessions({
        headers: await headers()
    })

    return sessions
}