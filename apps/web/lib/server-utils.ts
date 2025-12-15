import { headers } from "next/headers"
import { auth } from "@workspace/auth/lib/auth"
import { redirect } from "next/navigation"
import { routes } from "@workspace/common/routes"
import { cache } from "react"

export const getSafeAuthSession = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect(routes.web.auth.SignIn)

    return session
})