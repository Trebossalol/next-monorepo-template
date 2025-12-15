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
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { routes } from "@workspace/common/routes";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-full w-full grid place-items-center px-4">
            <Card className="card-animate w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Welcome back 🎉</CardTitle>
                    <CardDescription>
                        Sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-zinc-300">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-zinc-300">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-zinc-400 hover:text-zinc-200"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                className="border-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900"
                            />
                            <Label htmlFor="remember" className="text-zinc-400">
                                Remember me
                            </Label>
                        </div>
                        <a href="#" className="text-sm text-zinc-300 hover:text-zinc-100">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-10 rounded-lg bg-zinc-50 text-zinc-900 hover:bg-zinc-200"
                    >
                        Continue
                    </Button>
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
