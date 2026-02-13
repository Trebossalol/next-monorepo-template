import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from '@workspace/ui/components/empty'
import {
	Page,
	PageBody,
	PageHeader,
	PagePrimaryBar
} from '@workspace/ui/components/page'
import { Home } from 'lucide-react'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function AppHomePage() {
	const session = await getSafeAuthSession()

	return (
		<Page>
			<PageHeader>
				<PagePrimaryBar>Home</PagePrimaryBar>
			</PageHeader>
			<PageBody>
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Home />
						</EmptyMedia>
						<EmptyTitle>Home</EmptyTitle>
						<EmptyDescription>
							Welcome back, {session.user.name}!
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			</PageBody>
		</Page>
	)
}
