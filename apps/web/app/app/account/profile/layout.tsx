import React, { ReactNode } from 'react'
import { AnnotatedLayout, AnnotatedSection } from '@workspace/ui/components/annotated'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import { NextLayoutProps } from '@/types/next'
import { AccountNavigation } from '@/components/app/account/account-navigation'

export default function AccountProfileLayout({ personalDetails }: NextLayoutProps & {
    personalDetails: ReactNode
}) {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    <AccountNavigation />
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <AnnotatedLayout>
                    <AnnotatedSection title="Personal Details" description="Manage your personal details">
                        {personalDetails}
                    </AnnotatedSection>
                </AnnotatedLayout>
            </PageBody>
        </Page>
    )
}
