import { Home, Settings, FileText, User } from "lucide-react";

export const sidebarMenuItems = [
    {
        title: "Home",
        url: "/app",
        icon: Home,
    },
    {
        title: "Documents",
        url: "/app/documents",
        icon: FileText
    },
    {
        title: "Profile",
        url: "/app/profile",
        icon: User
    },
    {
        title: "Settings",
        url: "/app/settings",
        icon: Settings
    },
]