import React from 'react'
import { getAccountSessions } from '@/data/account/security/get-account-sessions'
import { getSafeAuthSession } from '@/lib/server-utils'
import AccountSessionsTable from '@/components/app/account/security/sessions-table'
import { notFound } from 'next/navigation'

export default async function SessionsPage() {
    await getSafeAuthSession()

    const [accountSessions] = await Promise.all([
        getAccountSessions()
    ])

    if (!accountSessions) notFound()

    return (
        <AccountSessionsTable
            sessions={accountSessions}
        />
    )
}
