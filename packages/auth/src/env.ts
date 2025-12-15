import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
    clientPrefix: 'NEXT_PUBLIC_',
    client: {
        NEXT_PUBLIC_AUTH_URL: z.string().url().default('https://localhost:3000')
    },
    server: {
        AUTH_SECRET: z.string().min(1)
    },
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXT_PUBLIC_AUTH_URL: process.env.AUTH_URL
    },
})