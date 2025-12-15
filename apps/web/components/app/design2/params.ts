import { parseAsStringEnum } from "nuqs/server"

export enum Design2Tab {
    Section1 = 'section1',
    Section2 = 'section2'
}

export const searchParams = {
    tab: parseAsStringEnum<Design2Tab>(Object.values(Design2Tab))
        .withDefault(Design2Tab.Section1)
}