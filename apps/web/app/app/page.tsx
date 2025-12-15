import React from 'react'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'

export default function AppPage() {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Title
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                content
            </PageBody>
        </Page>
    )
}
