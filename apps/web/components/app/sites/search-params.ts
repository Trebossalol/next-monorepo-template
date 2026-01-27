import { createSearchParamsCache, Options, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { Site } from "@workspace/database/index";
import { SortOrder } from "@/types/utils";
import { siteStatusSchema } from "@/schemas/site/site-status-schema";

export type SortBy = keyof Site;

export const VALID_SORT_FIELDS: SortBy[] = ["name", "status", "createdAt", "updatedAt"];
export const DEFAULT_SORT_BY: SortBy = "createdAt";
export const DEFAULT_PAGE_SIZE: number = 25;

const queryOptions: Options = { shallow: false }

export const searchParams = {
    query: parseAsString
        .withDefault("")
        .withOptions(queryOptions),
    pageIndex: parseAsInteger
        .withDefault(0)
        .withOptions(queryOptions),
    pageSize: parseAsInteger
        .withDefault(DEFAULT_PAGE_SIZE)
        .withOptions(queryOptions),
    status: parseAsArrayOf(parseAsStringEnum(siteStatusSchema.options))
        .withDefault([])
        .withOptions(queryOptions),
    sortBy: parseAsStringEnum(VALID_SORT_FIELDS)
        .withDefault(DEFAULT_SORT_BY)
        .withOptions(queryOptions),
    sortOrder: parseAsStringEnum(Object.values(SortOrder))
        .withDefault(SortOrder.Asc)
        .withOptions(queryOptions),
    selectedRows: parseAsArrayOf(parseAsString)
        .withDefault([])
        .withOptions(queryOptions),
}

export const searchParamsCache = createSearchParamsCache(searchParams);