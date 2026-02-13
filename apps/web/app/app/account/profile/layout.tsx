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
import React, { type ReactNode } from 'react'
import { AccountNavigation } from '@/components/app/account/account-navigation'
import type { NextLayoutProps } from '@/types/next'

export default function AccountProfileLayout({
	personalDetails
}: NextLayoutProps & {
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
					<AnnotatedSection
						title="Personal Details"
						description="Manage your personal details"
					>
						{personalDetails}
					</AnnotatedSection>
				</AnnotatedLayout>
			</PageBody>
		</Page>
	)
}
