import React from 'react'
import { getExampleData } from '@/data/example/get-example-data'
import { ExampleTable } from '@/components/app/example/example-table'
import { Page, PageBody, PageContent, PageHeader, PagePrimaryBar } from '@workspace/ui/components/custom/page'
import { searchParamsCache } from '@/components/app/example/search-params'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function ExamplePage(props: NextPageProps) {

    await getSafeAuthSession()

    await searchParamsCache.parse(props.searchParams)

    const initialData = await getExampleData()

    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Example Table
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <PageContent title="Example Table">
                    <ExampleTable initialData={initialData} />
                </PageContent>
            </PageBody>
        </Page>
    )
}
