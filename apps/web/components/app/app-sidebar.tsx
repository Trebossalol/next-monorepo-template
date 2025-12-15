"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, LogOut, ChevronUp, LockIcon } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail
} from "@workspace/ui/components/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { sidebarMenuItems } from "@/components/app/links"
import { APP_NAME } from "@workspace/common/constants"
import { NextLayoutProps } from "@/types/next"
import { routes } from "@workspace/common/routes"
import { authClient } from "@workspace/auth/lib/auth-client"

export default function AppSidebar({ children }: NextLayoutProps) {
    const pathname = usePathname()

    async function handleSignOut() {
        authClient.signOut()
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm font-semibold">{APP_NAME.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">App</span>
                            <span className="text-xs text-muted-foreground">Dashboard</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarMenuItems
                                    .map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={pathname === item.url}
                                            >
                                                <Link href={item.url}>
                                                    <item.Icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-accent w-full transition-colors">
                                <Avatar className="size-8">
                                    <AvatarImage src="" alt="User" />
                                    <AvatarFallback>
                                        <User className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-medium truncate">John Doe</span>
                                    <span className="text-xs text-muted-foreground truncate">john.doe@example.com</span>
                                </div>
                                <ChevronUp className="size-4 text-muted-foreground shrink-0" />
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
                                onClick={handleSignOut}
                            >
                                <LogOut className="size-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
