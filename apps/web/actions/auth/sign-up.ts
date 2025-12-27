'use server';

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "@/schemas/auth/sign-up-schema";
import { auth } from "@workspace/auth/lib/auth";
import { ValidationError } from "@workspace/common/errors";
import { routes } from "@workspace/common/routes";

export const signUp = actionClient
    .metadata({ actionName: "signUp" })
    .inputSchema(signUpSchema)
    .action(async ({ parsedInput }) => {
        try {
            await auth.api.signUpEmail({
                body: {
                    name: parsedInput.name,
                    email: parsedInput.email,
                    password: parsedInput.password,
                    callbackURL: routes.web.app.Index
                }
            });
        } catch (error) {
            const errorString = String(error)

            if (errorString.includes('User already exists')) {
                throw new ValidationError('User already exists');
            }

            if (errorString.includes('Password too short')) {
                throw new ValidationError('Password too short');
            }

            throw new ValidationError('Failed to sign up');
        }
    });