"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { sidebarMenuItems } from "@/components/app/links"
import { APP_NAME } from "@workspace/common/constants"
import { AccountDropdownMenu } from "@/components/app/account/account-dropdown-menu"

export default function AppSidebar({ children }: NextLayoutProps) {
    const pathname = usePathname()

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm font-semibold">{APP_NAME.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{APP_NAME}</span>
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
                    <AccountDropdownMenu />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
