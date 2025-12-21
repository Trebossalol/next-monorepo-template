'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { accountMenuItems } from '../links'
import { usePathname, useRouter } from 'next/navigation'

export function AccountNavigation() {
    const pathname = usePathname()
    const router = useRouter()
    const activeItem = accountMenuItems.find((item) => item.url.includes(pathname))

    if (!activeItem) return null

    return (
        <Tabs value={activeItem?.url} onValueChange={(value) => router.push(value)}>
            <TabsList>
                {accountMenuItems.map((item) => (
                    <TabsTrigger key={item.title} value={item.url}>
                        <item.Icon className='size-4' />
                        <span>{item.title}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}