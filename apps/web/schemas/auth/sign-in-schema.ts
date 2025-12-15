import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

