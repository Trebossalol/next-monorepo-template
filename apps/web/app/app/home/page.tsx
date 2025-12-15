import React from 'react'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import { auth } from '@workspace/auth/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { routes } from '@workspace/common/routes'

export default async function AppHomePage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect(routes.web.auth.SignIn)

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
