import { routes } from "@workspace/common/routes";
import { BookOpen, Home, Lock, Paintbrush, User } from "lucide-react";

export const sidebarMenuItems = [
    {
        title: "Home",
        url: routes.web.app.Home,
        Icon: Home,
    },
    {
        title: 'Design 1',
        url: routes.web.app.design1.Index,
        Icon: Paintbrush
    },
    {
        title: 'Design 2',
        url: routes.web.app.design2.Index,
        Icon: Paintbrush
    },
    {
        title: 'Docs',
        url: routes.web.app.Docs,
        Icon: BookOpen
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