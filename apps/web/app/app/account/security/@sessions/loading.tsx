import React from 'react'
import { Skeleton } from '@workspace/ui/components/skeleton'
import { Card, CardContent } from '@workspace/ui/components/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@workspace/ui/components/table'

export default function SessionsLoadingPage() {
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-12'>#</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead className='text-right w-16'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className='w-12'>
                                    <Skeleton className="h-4 w-4" />
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Skeleton className="h-4 flex-1 max-w-[300px]" />
                                        {index === 0 && (
                                            <Skeleton className="h-5 w-24 rounded-full" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className='text-right w-16'>
                                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
