import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import React from 'react'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function DocsPage() {

    await getSafeAuthSession()

    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Documentation
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                More to come...
            </PageBody>
        </Page>
    )
}
