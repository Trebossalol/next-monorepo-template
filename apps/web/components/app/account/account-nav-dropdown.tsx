'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { Button } from '@workspace/ui/components/button'
import { accountMenuItems } from '../links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'

export default function AccountNavDropdown() {
    const pathname = usePathname()
    const isActive = (url: string) => pathname === url
    const activeItem = accountMenuItems.find((item) => item.url.includes(pathname))

    if (!activeItem) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <activeItem.Icon className='size-4' />
                    <span>{activeItem.title}</span>
                    <ChevronDown className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {accountMenuItems.map((item) => (
                    <DropdownMenuItem key={item.title}>
                        <Link href={item.url} className={cn('flex items-center gap-2', isActive(item.url) && 'bg-accent text-accent-foreground')}>
                            <item.Icon className='size-4' />
                            <span>{item.title}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}