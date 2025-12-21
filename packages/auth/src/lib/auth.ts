import { prisma } from "@workspace/database/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),
    onAPIError: {
        throw: true,
        onError: (error) => console.error('[Auth Error] - ', error)
    },
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        minPasswordLength: 12
    },
    plugins: [
        admin(),
        // Must be last plugin
        nextCookies()
    ]
});