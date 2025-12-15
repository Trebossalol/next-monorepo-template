import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@workspace/auth/lib/auth";
import { routes } from "@workspace/common/routes";

export async function proxy() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return NextResponse.redirect(routes.web.auth.SignIn);

    return NextResponse.next();
}
export const config = {
    matcher: ["/app"]
};