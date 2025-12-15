'use client'

import { Design2Tab, searchParams } from "./params"
import { useQueryStates } from "nuqs"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Brush, Paintbrush } from "lucide-react"

export default function Design2TabSelector() {
    const [{ tab }, setSearchParams] = useQueryStates(searchParams)

    return (
        <Tabs value={tab} onValueChange={(value) => setSearchParams({ tab: value as Design2Tab })}>
            <TabsList>
                {design2TabItems.map((item) => (
                    <TabsTrigger key={item.value} value={item.value}>
                        <item.Icon className='size-4' />
                        <span>{item.title}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

export const design2TabItems = [
    {
        title: 'Section 1',
        value: Design2Tab.Section1,
        Icon: Brush
    },
    {
        title: 'Section 2',
        value: Design2Tab.Section2,
        Icon: Paintbrush
    }
]