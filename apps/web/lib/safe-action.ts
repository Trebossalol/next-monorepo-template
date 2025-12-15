import {
    createSafeActionClient,
} from 'next-safe-action';
import { z } from 'zod';
import { ForbiddenError, ValidationError, PreConditionError, NotFoundError, ServerError, ConflictError, ErrorCode } from '@workspace/common/errors';
import { headers } from 'next/headers';
import { auth } from '@workspace/auth/lib/auth';

export const actionClient = createSafeActionClient({
    handleServerError(e) {
        if (
            e instanceof ValidationError ||
            e instanceof ForbiddenError ||
            e instanceof NotFoundError ||
            e instanceof PreConditionError ||
            e instanceof ServerError ||
            e instanceof ConflictError
        ) {
            console.error(e);
            return e.message;
        }

        return ErrorCode.ServerError
    },
    defineMetadataSchema() {
        return z.object({
            actionName: z.string()
        });
    }
});

export const authActionClient = actionClient.use(async ({ next }) => {
    const ctx = await auth.api.getSession({
        headers: await headers()
    });

    if (!ctx) throw new ForbiddenError();

    return next({ ctx });
});