import React from 'react'
import { Skeleton } from '@workspace/ui/components/skeleton'
import { Card, CardContent } from '@workspace/ui/components/card'

export default function ChangePasswordLoadingPage() {
    return (
        <Card>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-3 w-64" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-3 w-72" />
                    </div>
                    <div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

