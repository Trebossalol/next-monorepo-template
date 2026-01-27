import React from 'react'
import { ExampleTable } from '@/components/app/sites/sites-table'
import { Page, PageBody, PageBreadcrumb, PageContent, PageHeader, PagePrimaryBar } from '@workspace/ui/components/custom/page'
import { searchParamsCache } from '@/components/app/sites/search-params'
import { getSafeAuthSession } from '@/lib/server-utils'
import { getSites } from '@/data/site/get-sites'
import { TransitionProvider } from '@/hooks/use-transition-context'

export default async function SitesPage(props: NextPageProps) {

    await getSafeAuthSession()

    const searchParams = await searchParamsCache.parse(props.searchParams)

    const { sites, totalCount } = await getSites(searchParams)

    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    <PageBreadcrumb segments={[{ label: "Sites" }]} />
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <PageContent title="Manage Sites">
                    <TransitionProvider>
                        <ExampleTable sites={sites} totalCount={totalCount} />
                    </TransitionProvider>
                </PageContent>
            </PageBody>
        </Page>
    )
}
