import z from "zod";

export const updatePasswordSchema = z.object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z.string().min(8, "New password is required"),
    confirmPassword: z.string().min(8, "Confirm password is required")
})

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;