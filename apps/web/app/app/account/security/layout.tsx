import {
	AnnotatedLayout,
	AnnotatedSection
} from '@workspace/ui/components/annotated'
import {
	Page,
	PageBody,
	PageHeader,
	PagePrimaryBar
} from '@workspace/ui/components/page'
import { Separator } from '@workspace/ui/components/separator'
import React, { type ReactNode } from 'react'
import { AccountNavigation } from '@/components/app/account/account-navigation'
import type { NextLayoutProps } from '@/types/next'

export default function AccountSecurityLayout({
	changePassword,
	sessions
}: NextLayoutProps & {
	changePassword: ReactNode
	sessions: ReactNode
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
					<AnnotatedSection
						title="Change Password"
						description="Manage your password"
					>
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
