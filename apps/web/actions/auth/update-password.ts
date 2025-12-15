'use server';

import { actionClient } from "@/lib/safe-action";
import { updatePasswordSchema } from "@/schemas/auth/update-password-schema";
import { auth } from "@workspace/auth/lib/auth";
import { ValidationError } from "@workspace/common/errors";
import { headers } from "next/headers";

export const updatePassword = actionClient
    .metadata({ actionName: "updatePassword" })
    .inputSchema(updatePasswordSchema)
    .action(async ({ parsedInput }) => {
        if (parsedInput.newPassword !== parsedInput.confirmPassword) {
            throw new ValidationError('New password and confirm password do not match');
        }

        try {

            await auth.api.changePassword({
                body: {
                    currentPassword: parsedInput.currentPassword,
                    newPassword: parsedInput.newPassword,
                    revokeOtherSessions: true
                },
                headers: await headers()
            });
        } catch (error) {
            console.error(error);
            throw new ValidationError('Failed to update password');
        }
    });