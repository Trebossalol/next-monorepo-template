import React, { ReactNode } from 'react'
import { AnnotatedLayout, AnnotatedSection } from '@workspace/ui/components/annotated'
import { Page, PageBody, PageHeader, PagePrimaryBar } from '@workspace/ui/components/page'
import { NextLayoutProps } from '@/types/next'
import { Separator } from '@workspace/ui/components/separator'

export default function AccountSecurityLayout({ changePassword, sessions }: NextLayoutProps & {
    changePassword: ReactNode,
    sessions: ReactNode
}) {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Security
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <AnnotatedLayout>
                    <AnnotatedSection title="Change Password" description="Manage your password">
                        {changePassword}
                    </AnnotatedSection>
                    <Separator />
                    <AnnotatedSection title="Sessions" description="Manage your sessions">
                        {sessions}
                    </AnnotatedSection>
                </AnnotatedLayout>
            </PageBody>
        </Page>
    )
}
