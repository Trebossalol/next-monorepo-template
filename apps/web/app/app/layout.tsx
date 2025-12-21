import AppSidebar from "@/components/app/app-sidebar";
import { NextLayoutProps } from "@/types/next";

export default async function AppLayout({ children }: NextLayoutProps) {
    return (
        <AppSidebar>
            {children}
        </AppSidebar>
    )
}

