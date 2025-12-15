import { env } from "@workspace/common/env";

export const baseUrl = {
    Web: env.NEXT_PUBLIC_WEB_URL
} as const

export const routes = {
    web: {
        Index: `${baseUrl.Web}/`,
        auth: {
            Login: `${baseUrl.Web}/auth/login`,
            Register: `${baseUrl.Web}/auth/register`,
        }
    }
} as const