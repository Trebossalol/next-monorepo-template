import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { Site, SiteStatus } from "@workspace/database/index";
import { SortOrder } from "@/types/utils";

export type SortBy = keyof Site;

export const VALID_SORT_FIELDS: SortBy[] = ["name", "status", "createdAt", "updatedAt"];
export const DEFAULT_SORT_BY: SortBy = "createdAt";
export const DEFAULT_PAGE_SIZE: number = 25;

export const searchParams = {
    query: parseAsString
        .withDefault("")
        .withOptions({
            shallow: false,
        }),
    pageIndex: parseAsInteger
        .withDefault(0)
        .withOptions({
            shallow: false,
        }),
    pageSize: parseAsInteger
        .withDefault(DEFAULT_PAGE_SIZE)
        .withOptions({
            shallow: false,
        }),
    status: parseAsArrayOf(parseAsStringEnum(Object.values(SiteStatus)))
        .withDefault([])
        .withOptions({
            shallow: false,
        }),
    columnFilters: parseAsArrayOf(parseAsStringEnum(Object.values(SiteStatus)))
        .withDefault([])
        .withOptions({
            shallow: false,
        }),
    sortBy: parseAsStringEnum(VALID_SORT_FIELDS)
        .withDefault(DEFAULT_SORT_BY)
        .withOptions({
            shallow: false,
        }),
    sortOrder: parseAsStringEnum(Object.values(SortOrder))
        .withDefault(SortOrder.Asc)
        .withOptions({
            shallow: false,
        }),
}

export const searchParamsCache = createSearchParamsCache(searchParams);