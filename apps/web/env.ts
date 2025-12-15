import { createEnv } from "@t3-oss/env-nextjs";
import { env as commonEnv } from "@workspace/common/env";
import { env as authEnv } from "@workspace/auth/env";
import { env as databaseEnv } from "@workspace/database/env";

export const env = createEnv({
    emptyStringAsUndefined: true,
    extends: [
        commonEnv,
        authEnv,
        databaseEnv
    ],
    runtimeEnv: {}
})