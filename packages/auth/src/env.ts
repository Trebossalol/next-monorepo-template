import { createEnv } from "@t3-oss/env-nextjs";

import z from "zod";
export const env = createEnv({
    server: {
        AUTH_SECRET: z.string().min(1),
        AUTH_URL: z.string().url().default('https://localhost:3000')
    },
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_URL: process.env.AUTH_URL,
    },
})