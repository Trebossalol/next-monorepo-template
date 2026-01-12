import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
    clientPrefix: 'NEXT_PUBLIC_',
    client: {
        NEXT_PUBLIC_WEB_URL: z.string().url().optional().default('https://localhost:3000')
    },
    server: {
        ALLOWED_ORIGINS: z.array(z.string()).optional().default(['https://localhost:3000'])
    },
    runtimeEnv: {
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    }
})