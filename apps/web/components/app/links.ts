import { routes } from "@workspace/common/routes";
import { BookOpen, Home, Lock, Table, User } from "lucide-react";

export const sidebarMenuItems = [
    {
        title: "Home",
        url: routes.web.app.Home,
        Icon: Home,
    },
    {
        title: 'Docs',
        url: routes.web.app.Docs,
        Icon: BookOpen
    },
    {
        title: 'Example Table',
        url: routes.web.app.Example,
        Icon: Table
    }
]

export const accountMenuItems = [
    {
        title: 'Profile',
        url: routes.web.app.account.Profile,
        Icon: User
    },
    {
        title: 'Security',
        url: routes.web.app.account.Security,
        Icon: Lock
    }
]