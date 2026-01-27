import React from 'react'
import { ExampleTable } from '@/components/app/sites/sites-table'
import { Page, PageBody, PageContent, PageHeader, PagePrimaryBar } from '@workspace/ui/components/custom/page'
import { searchParamsCache } from '@/components/app/sites/search-params'
import { getSafeAuthSession } from '@/lib/server-utils'
import { getSites } from '@/data/site/get-sites'

export default async function SitesPage(props: NextPageProps) {

    await getSafeAuthSession()

    const searchParams = await searchParamsCache.parse(props.searchParams)

    const { sites, totalCount } = await getSites(searchParams)

    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Example Table
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <PageContent title="Sites">
                    <ExampleTable sites={sites} totalCount={totalCount} />
                </PageContent>
            </PageBody>
        </Page>
    )
}
