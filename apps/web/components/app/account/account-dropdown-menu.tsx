"use client"

import Link from "next/link"
import { User, LogOut, ChevronUp, LockIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { routes } from "@workspace/common/routes"
import { useSession, signOut } from "@workspace/auth/lib/auth-client"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function AccountDropdownMenu() {
    const session = useSession()
    const isPending = session.isPending

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-accent w-full transition-colors">
                    <Avatar className="size-8">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback>
                            <User className="size-4" />
                        </AvatarFallback>
                    </Avatar>
                    {isPending ? (
                        <Skeleton className="h-8 flex-1" />
                    ) : (
                        <>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-medium truncate">
                                    {session.data?.user.name}
                                </span>
                                <span className="text-xs text-muted-foreground truncate">
                                    {session.data?.user.email}
                                </span>
                            </div>
                            <ChevronUp className="size-4 text-muted-foreground shrink-0" />
                        </>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={routes.web.app.account.Profile} className="flex items-center gap-2">
                        <User className="size-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={routes.web.app.account.Security} className="flex items-center gap-2">
                        <LockIcon className="size-4" />
                        <span>Security</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => signOut()}
                >
                    <LogOut className="size-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
