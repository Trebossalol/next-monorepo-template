'use client'

import { AccountSessionDto } from '@/types/dto/account/account-sessions-dto'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@workspace/ui/components/table'
import { Button } from '@workspace/ui/components/button'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { authClient } from '@workspace/auth/lib/auth-client'
import { toast } from 'sonner'
import { Badge } from '@workspace/ui/components/badge'

type AccountSessionsTableProps = {
    sessions: AccountSessionDto[]
}

export default function AccountSessionsTable({ sessions }: AccountSessionsTableProps) {
    const handleDeleteSession = async (session: AccountSessionDto) => {
        await authClient.revokeSession({
            token: session.token
        })

        toast.success('Session deleted successfully')
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-12'>#</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead className='text-right w-16'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sessions.map((session, index) => (
                    <TableRow key={session.id}>
                        <TableCell className='w-12'>{index + 1}</TableCell>
                        <TableCell>
                            <div className='flex items-center gap-2'>
                                <span className='truncate flex-1 space-x-2'>
                                    {session.userAgent || 'N/A'}
                                </span>
                                {session.token === session.token && (
                                    <Badge variant={'default'}>
                                        Current session
                                    </Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell className='text-right w-16'>
                            <Button
                                variant='ghost'
                                size='icon-sm'
                                onClick={() => handleDeleteSession(session)}
                                aria-label='Delete session'
                            >
                                <Trash2 className='size-4 text-destructive' />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
