import React from 'react'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function AppHomePage() {

    const session = await getSafeAuthSession()

    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Home
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                Hello {session.user.name}!
            </PageBody>
        </Page>
    )
}
