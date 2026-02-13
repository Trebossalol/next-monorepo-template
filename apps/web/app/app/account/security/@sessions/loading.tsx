import { Badge } from '@workspace/ui/components/badge'
import { Card, CardContent } from '@workspace/ui/components/card'
import { Skeleton } from '@workspace/ui/components/skeleton'
import React from 'react'

export default function SessionsLoadingPage() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<Card key={index} className="transition-all duration-200">
					<CardContent className="p-6">
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-start gap-4 flex-1 min-w-0">
								<Skeleton className="w-12 h-12 rounded-lg shrink-0" />

								<div className="flex-1 min-w-0 space-y-2">
									<div className="flex items-center gap-2 flex-wrap">
										<Skeleton className="h-4 w-48" />
										{index === 0 && (
											<Badge variant="default" className="text-xs">
												Current Session
											</Badge>
										)}
									</div>

									<div className="flex flex-wrap items-center gap-4">
										<Skeleton className="h-3 w-32" />
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-3 w-40" />
									</div>
								</div>
							</div>

							{index !== 0 && (
								<Skeleton className="h-8 w-8 rounded-md shrink-0" />
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
