'use client'

import { routes } from '@workspace/common/routes'
import { Button } from '@workspace/ui/components/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
	const router = useRouter()

	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
			<div className="mx-auto max-w-md text-center">
				<h1 className="text-8xl font-bold text-foreground mb-4 tracking-tight">
					404
				</h1>
				<h2 className="text-2xl font-semibold text-foreground mb-2">
					Page Not Found
				</h2>
				<p className="text-muted-foreground mb-8">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button asChild>
						<Link href={routes.web.app.Home}>
							<Home className="size-4" />
							Go Home
						</Link>
					</Button>
					<Button variant="outline" onClick={() => router.back()}>
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
				</div>
			</div>
		</div>
	)
}
