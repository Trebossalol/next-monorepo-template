import React, { ReactNode } from 'react'
import { AnnotatedLayout, AnnotatedSection } from '@workspace/ui/components/annotated'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import { NextLayoutProps } from '@/types/next'

export default function AccountProfileLayout({ personalDetails }: NextLayoutProps & {
    personalDetails: ReactNode
}) {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Profile
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
