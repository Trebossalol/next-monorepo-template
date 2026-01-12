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
            Home: `${baseUrl.Web}/app/home`,
            design1: {
                Index: `${baseUrl.Web}/app/design1`
            },
            design2: {
                Index: `${baseUrl.Web}/app/design2`
            },
            Docs: `${baseUrl.Web}/app/docs`,
            Example: `${baseUrl.Web}/app/example`,
            account: {
                Profile: `${baseUrl.Web}/app/account/profile`,
                Security: `${baseUrl.Web}/app/account/security`
            },
        }
    }
} as const