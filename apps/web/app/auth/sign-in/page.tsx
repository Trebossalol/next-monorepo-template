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
import { signInSchema, SignInSchema } from "@/schemas/auth/sign-in-schema";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { routes } from "@workspace/common/routes";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { signIn } from "@/actions/auth/sign-in";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false
        }
    })

    const onSubmit = async (data: SignInSchema) => {
        const result = await signIn(data);
        if (result.serverError) toast.error(result.serverError);
        else {
            toast.success('Signed in successfully', {
                description: 'You are being redirected to the application.'
            })
            router.push(routes.web.app.Index)
        }
    }

    return (
        <div className="h-full w-full grid place-items-center px-4">
            <Card className="card-animate w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome back 🎉</CardTitle>
                    <CardDescription>
                        Sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            type="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="you@example.com"
                                            autoComplete="email"
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
                                                autoComplete="current-password"
                                            />
                                            <InputGroupAddon
                                                align="inline-end"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="cursor-pointer"
                                                    type="button"
                                                >
                                                    {showPassword ?
                                                        <EyeOffIcon className="size-4" /> :
                                                        <EyeIcon className="size-4" />
                                                    }
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
                        <FieldGroup>
                            <Controller
                                name="remember"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked === true)}
                                            className="border-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900"
                                        />
                                        <FieldLabel htmlFor="remember" className="text-zinc-400 cursor-pointer">
                                            Remember me
                                        </FieldLabel>
                                    </div>
                                )}
                            />
                        </FieldGroup>

                        <Button
                            className="w-full h-10 rounded-lg"
                            type="submit"
                            isLoading={form.formState.isSubmitting}
                        >
                            Continue
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex items-center justify-center text-sm text-zinc-400">
                    Don&apos;t have an account?
                    <a className="ml-1 text-zinc-200 hover:underline" href={routes.web.auth.SignUp}>
                        Create one
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
