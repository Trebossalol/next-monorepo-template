import { routes } from "@workspace/common/routes"
import { redirect } from "next/navigation"

export default function Page() {
  redirect(routes.web.app.Index)
}
