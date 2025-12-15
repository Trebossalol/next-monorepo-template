import { routes } from "@workspace/common/routes";
import { Home, Settings } from "lucide-react";

export const sidebarMenuItems = [
    {
        title: "Home",
        url: routes.web.app.Home,
        icon: Home,
    },
    {
        title: 'Configuration',
        url: routes.web.app.configuration.Index,
        icon: Settings,
    }
]