"use client";

import * as React from "react";
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, SignUpSchema } from "@/schemas/auth/sign-up-schema";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { routes } from "@workspace/common/routes";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { signUp } from "@/actions/auth/sign-up";
import { toast } from "sonner";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SignUpSchema) => {
        const result = await signUp(data);
        if (result.serverError) toast.error(result.serverError);
    }

    return (
        <div className="h-full w-full grid place-items-center px-4">
            <Card className="card-animate w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account 🎉</CardTitle>
                    <CardDescription>
                        Sign up to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="John Doe"
                                            autoComplete="off"
                                        />
                                        <FieldDescription>
                                            Enter your full name
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="john.doe@example.com"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                {...field}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                autoComplete="off"
                                            />
                                            <InputGroupAddon
                                                align="inline-end"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="cursor-pointer"
                                                >
                                                    {showPassword ?
                                                        <EyeOffIcon className="size-4" /> :
                                                        <EyeIcon className="size-4" />}
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button
                            className="w-full h-10 rounded-lg"
                            type="submit"
                            isLoading={form.formState.isSubmitting}
                        >
                            Create account
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex items-center justify-center text-sm text-zinc-400">
                    Already have an account?
                    <a className="ml-1 text-zinc-200 hover:underline" href={routes.web.auth.SignIn}>
                        Sign in
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
