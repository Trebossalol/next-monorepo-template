import { routes } from "@workspace/common/routes";
import { Home, Lock, Settings, User } from "lucide-react";

export const sidebarMenuItems = [
    {
        title: "Home",
        url: routes.web.app.Home,
        Icon: Home,
    },
    {
        title: 'Configuration',
        url: routes.web.app.configuration.Index,
        Icon: Settings,
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