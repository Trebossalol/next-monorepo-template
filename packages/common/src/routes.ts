import { env } from "@workspace/common/env";

export const baseUrl = {
    Web: env.NEXT_PUBLIC_WEB_URL
} as const

export const routes = {
    web: {
        Index: `${baseUrl.Web}/`,
        auth: {
            SignIn: `${baseUrl.Web}/auth/sign-in`,
            SignUp: `${baseUrl.Web}/auth/sign-up`,
        },
        app: {
            Index: `${baseUrl.Web}/app`,
        }
    }
} as const