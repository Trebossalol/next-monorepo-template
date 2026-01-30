'use client'

import React from 'react'
import { Card, CardContent } from '@workspace/ui/components/card'
import { updatePasswordSchema, UpdatePasswordSchema } from '@/schemas/auth/update-password-schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldDescription, FieldError, FieldLabel } from '@workspace/ui/components/field'
import PasswordInput from '@workspace/ui/components/password-input'
import { Button } from '@workspace/ui/components/button'
import { updatePassword } from '@/actions/auth/update-password'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@workspace/ui/components/alert'
import { AlertTriangleIcon } from 'lucide-react'

export default function ChangePasswordCard() {
    const form = useForm<UpdatePasswordSchema>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        mode: 'onSubmit'
    })

    const onSubmit = async (data: UpdatePasswordSchema) => {
        const result = await updatePassword(data)
        if (result.serverError) toast.error(result.serverError)
        else {
            toast.success('Password updated successfully')
            form.reset()
        }
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <Controller
                        name="currentPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                                <PasswordInput {...field} id="currentPassword" aria-invalid={fieldState.invalid} />
                                <FieldDescription>
                                    This is your current password.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                                <PasswordInput {...field} id="newPassword" aria-invalid={fieldState.invalid} />
                                <FieldDescription>
                                    This is your new password.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <PasswordInput {...field} id="confirmPassword" aria-invalid={fieldState.invalid} />
                                <FieldDescription>
                                    Type your new password again to confirm.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Alert variant="destructive">
                        <AlertTriangleIcon className="size-4" />
                        <AlertDescription>
                            Updating your password will revoke all other sessions.
                        </AlertDescription>
                    </Alert>

                    <div>
                        <Button
                            type="submit"
                        >
                            Update Password
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}