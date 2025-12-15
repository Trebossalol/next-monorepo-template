import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/postgres'),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
})