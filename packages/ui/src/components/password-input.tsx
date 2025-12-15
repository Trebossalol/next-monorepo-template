'use client'

import React, { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@workspace/ui/components/input-group'
import { Button } from '@workspace/ui/components/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function PasswordInput({ ...props }: React.ComponentProps<typeof InputGroupInput>) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <InputGroup>
            <InputGroupInput type={showPassword ? "text" : "password"} {...props} />
            <InputGroupAddon align="inline-end">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                    type='button'
                >
                    {showPassword ?
                        <EyeIcon className="size-4" /> :
                        <EyeOffIcon className="size-4" />}
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}