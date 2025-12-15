'use client'

import { AccountSessionDto } from '@/types/dto/account/account-sessions-dto'
import { Button } from '@workspace/ui/components/button'
import { Trash2, Monitor, Smartphone, Tablet, Laptop, Globe, Clock, MapPin } from 'lucide-react'
import React from 'react'
import { authClient } from '@workspace/auth/lib/auth-client'
import { toast } from 'sonner'
import { Badge } from '@workspace/ui/components/badge'
import { Card, CardContent } from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'

type AccountSessionsTableProps = {
    sessions: AccountSessionDto[]
}

function getDeviceIcon(userAgent?: string | null) {
    if (!userAgent) return Monitor

    const ua = userAgent.toLowerCase()
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        return Smartphone
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
        return Tablet
    }
    if (ua.includes('laptop') || ua.includes('macbook')) {
        return Laptop
    }
    return Monitor
}

function formatDate(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    }
    return 'Just now'
}

function parseUserAgent(userAgent?: string | null): { browser?: string; os?: string } {
    if (!userAgent) return {}

    const ua = userAgent.toLowerCase()
    let browser = 'Unknown'
    let os = 'Unknown'

    // Browser detection
    if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome'
    else if (ua.includes('firefox')) browser = 'Firefox'
    else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari'
    else if (ua.includes('edg')) browser = 'Edge'
    else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera'

    // OS detection
    if (ua.includes('windows')) os = 'Windows'
    else if (ua.includes('mac')) os = 'macOS'
    else if (ua.includes('linux')) os = 'Linux'
    else if (ua.includes('android')) os = 'Android'
    else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'

    return { browser, os }
}

export default function AccountSessionsTable({ sessions }: AccountSessionsTableProps) {
    const handleDeleteSession = async (session: AccountSessionDto) => {
        if (session.token === session.token) {
            toast.error('Cannot delete your current session')
            return
        }

        try {
            await authClient.revokeSession({
                token: session.token
            })
            toast.success('Session deleted successfully')
        } catch (error) {
            console.error(error)
            toast.error('Failed to delete session')
        }
    }

    if (sessions.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No active sessions found</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {sessions.map((session) => {
                const isCurrent = session.token === session.token
                const DeviceIcon = getDeviceIcon(session.userAgent)
                const { browser, os } = parseUserAgent(session.userAgent)
                const lastActive = formatDate(session.updatedAt)

                return (
                    <Card
                        key={session.id}
                        className={cn(
                            "transition-all duration-200 hover:shadow-md",
                            isCurrent && "ring-2 ring-primary ring-offset-2"
                        )}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className={cn(
                                        "flex items-center justify-center w-12 h-12 rounded-lg shrink-0",
                                        isCurrent
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                    )}>
                                        <DeviceIcon className="size-6" />
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="font-medium text-sm">
                                                {browser ?? 'Unknown Browser'} on {os ?? 'Unknown OS'}
                                            </div>
                                            {isCurrent && (
                                                <Badge variant="default" className="text-xs">
                                                    Current Session
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                            {session.ipAddress && (
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="size-3.5" />
                                                    <span>{session.ipAddress}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                <span>Active {lastActive}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Globe className="size-3.5" />
                                                <span className="truncate max-w-[200px]">
                                                    {session.userAgent || 'Unknown device'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!isCurrent && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteSession(session)}
                                        aria-label="Delete session"
                                        className="shrink-0 text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
