import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { SortOrder } from "@workspace/database/index";

export const VALID_SORT_FIELDS = ["name", "email", "status", "createdAt"] as const;
export type SortBy = (typeof VALID_SORT_FIELDS)[number];

export const DEFAULT_SORT_BY: SortBy = "createdAt";
export const DEFAULT_SORT_ORDER: SortOrder = SortOrder.asc;
export const DEFAULT_PAGE_SIZE = 25;

export const searchParams = {
    query: parseAsString.withDefault("").withOptions({
        shallow: true,
    }),
    pageIndex: parseAsInteger.withDefault(0).withOptions({
        shallow: true,
    }),
    pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({
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
    sortOrder: parseAsStringEnum(Object.values(SortOrder))
        .withDefault(DEFAULT_SORT_ORDER)
        .withOptions({
            shallow: true,
        }),
}

export const searchParamsCache = createSearchParamsCache(searchParams);