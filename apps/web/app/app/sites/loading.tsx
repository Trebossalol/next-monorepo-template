import {
	Page,
	PageBody,
	PageContent,
	PageHeader,
	PagePrimaryBar
} from '@workspace/ui/components/custom/page'
import { Skeleton } from '@workspace/ui/components/skeleton'

export default function ExampleLoadingPage() {
	return (
		<Page>
			<PageHeader>
				<PagePrimaryBar>
					<Skeleton className="h-6 w-32" />
				</PagePrimaryBar>
			</PageHeader>
			<PageBody>
				<PageContent title="Example Table">
					<div className="space-y-4">
						{/* Search and filters skeleton */}
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-[250px]" />
							<Skeleton className="h-8 w-24" />
							<Skeleton className="h-8 w-24" />
						</div>
						{/* Table skeleton */}
						<div className="overflow-hidden rounded-lg border">
							<div className="space-y-3 p-4">
								{/* Table header */}
								<div className="flex gap-4">
									<Skeleton className="h-4 w-12" />
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-48" />
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-16 ml-auto" />
								</div>
								{/* Table rows */}
								{Array.from({ length: 5 }).map((_, idx) => (
									<div key={idx} className="flex gap-4">
										<Skeleton className="h-4 w-12" />
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-4 w-48" />
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-4 w-16 ml-auto" />
									</div>
								))}
							</div>
						</div>
						{/* Pagination skeleton */}
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-32" />
							<div className="flex items-center gap-2">
								<Skeleton className="h-8 w-8" />
								<Skeleton className="h-8 w-8" />
								<Skeleton className="h-8 w-8" />
								<Skeleton className="h-8 w-8" />
							</div>
						</div>
					</div>
				</PageContent>
			</PageBody>
		</Page>
	)
}
