import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

export const VALID_SORT_FIELDS = ["name", "email", "status", "createdAt"] as const;
export type SortField = (typeof VALID_SORT_FIELDS)[number];

const DEFAULT_SORT_BY: SortField = "createdAt";
const DEFAULT_SORT_ORDER = "asc" as const;

export const searchParams = {
    query: parseAsString.withDefault("").withOptions({
        shallow: true,
    }),
    pageIndex: parseAsInteger.withDefault(0).withOptions({
        shallow: true,
    }),
    pageSize: parseAsInteger.withDefault(25).withOptions({
        shallow: true,
    }),
    status: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
        shallow: true,
    }),
    sortBy: parseAsStringEnum([...VALID_SORT_FIELDS])
        .withDefault(DEFAULT_SORT_BY)
        .withOptions({
            shallow: true,
        }),
    sortOrder: parseAsStringEnum(["asc", "desc"])
        .withDefault(DEFAULT_SORT_ORDER)
        .withOptions({
            shallow: true,
        }),
}

export const searchParamsCache = createSearchParamsCache(searchParams);