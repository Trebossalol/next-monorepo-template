import React from 'react'
import { ExampleTable } from '@/components/app/example-table/example-table'
import { Page, PageBody, PageContent, PageHeader, PagePrimaryBar } from '@workspace/ui/components/custom/page'
import { searchParamsCache } from '@/components/app/example-table/search-params'
import { getSafeAuthSession } from '@/lib/server-utils'
import { getSites } from '@/data/site/get-sites'

export default async function ExampleTablePage(props: NextPageProps) {

    await getSafeAuthSession()

    await searchParamsCache.parse(props.searchParams)

    const { sites, totalCount } = await getSites()

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
