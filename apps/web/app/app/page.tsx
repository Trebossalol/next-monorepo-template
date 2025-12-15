import { routes } from "@workspace/common/routes";
import { redirect } from "next/navigation";

export default function AppPage() {
    redirect(routes.web.app.Home)
}