"use client"

import * as React from "react"
import { useQueryStates } from "nuqs"
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
    createSelectionColumn,
    DataTable,
    type FilterConfig,
    SortableColumnHeader,
} from "@workspace/ui/components/custom/data-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { searchParams } from "./search-params"
import { cn } from "@workspace/ui/lib/utils"
import { capitalize, getInitials } from "@workspace/common/utils/labels"
import { SiteDto } from "@/types/dto/site/site-dto"
import { SiteStatus } from "@workspace/database/index"
import { SortOrder } from "@/types/utils"

interface ExampleTableProps {
    sites: SiteDto[]
    totalCount: number
}

export function ExampleTable({ sites, totalCount }: ExampleTableProps) {
    const [{ query, pageIndex, pageSize, status, columnFilters, sortBy, sortOrder }, setSearchParams] =
        useQueryStates(searchParams)

    const handleSortingChange = (newSorting: SortingState): void => {
        const [sort] = newSorting
        setSearchParams({
            sortBy: sort?.id as typeof sortBy,
            sortOrder: sort?.desc ? SortOrder.Desc : SortOrder.Asc,
            pageIndex: 0
        })
    }

    const handleFiltersChange = (filters: ColumnFiltersState): void => {
    }

    const handleDelete = async () => {
    }

    const handleEdit = (item: SiteDto) => {
    }

    const handleAdd = () => {
    }

    const handleDeleteClick = (item: SiteDto) => {
    }

    const columns: ColumnDef<SiteDto>[] = React.useMemo(
        () => [
            createSelectionColumn<SiteDto>(),
            {
                accessorKey: "createdBy",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Created By" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex max-w-[200px] items-center gap-2">
                            <Avatar className="size-6 shrink-0">
                                <AvatarFallback className="bg-muted">
                                    <span className="text-xs">{getInitials(row.original.createdBy.name)}</span>
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className="truncate font-medium text-foreground"
                                title={row.original.createdBy.name}
                            >
                                {row.original.createdBy.name}
                            </span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Name" />
                ),
                cell: ({ row }) => (
                    <span
                        className="block max-w-[250px] truncate text-foreground/80"
                        title={row.original.name}
                    >
                        {row.original.name}
                    </span>
                ),
            },
            {
                accessorKey: "description",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Description" />
                ),
                cell: ({ row }) => (
                    <Badge
                        className={cn(
                            "border-none px-2 py-0.5 font-medium text-foreground text-xs shadow-none",
                        )}
                        variant="outline"
                    >
                        {row.original.description ?? "-"}
                    </Badge>
                ),
            },
            {
                accessorKey: "status",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Status" />
                ),
                cell: ({ row }) => (
                    <Badge variant="outline">{capitalize(row.original.status)}</Badge>
                ),
            },
            {
                accessorKey: "createdAt",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Created" />
                ),
                cell: ({ row }) => (
                    <span className="text-foreground/80">
                        {format(row.original.createdAt, "dd MMM, yyyy")}
                    </span>
                ),
            },
            {
                id: "actions",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontalIcon className="shrink-0" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleDeleteClick(row.original)}
                                    className="text-destructive focus:text-destructive"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ),
            },
        ],
        [],
    )

    const statusFilters: FilterConfig[] = [
        {
            key: "status",
            title: "Status",
            options: Object.values(SiteStatus).map((status) => ({
                value: status,
                label: capitalize(status),
            })),
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={sites}
            emptyMessage="No items found."
            enableFilters
            enablePagination
            enableRowSelection
            enableSearch
            columnFilters={[]}
            filters={statusFilters}
            loading={false}
            onFiltersChange={handleFiltersChange}
            onPageIndexChange={(index) => setSearchParams({ pageIndex: index })}
            onPageSizeChange={(size) => {
                setSearchParams({ pageSize: size, pageIndex: 0 })
            }}
            onRowSelectionChange={() => { }}
            onSearchQueryChange={(value) => {
                setSearchParams({ query: value || null, pageIndex: 0 })
            }}
            onSortingChange={handleSortingChange}
            pageIndex={pageIndex}
            pageSize={pageSize}
            rowSelection={{}}
            searchPlaceholder="Search items..."
            searchQuery={query}
            sorting={[{ id: sortBy, desc: sortOrder === SortOrder.Desc }]}
            toolbarActions={
                <Button onClick={handleAdd} size="sm">
                    <PlusIcon className="size-4 shrink-0" />
                    Add Item
                </Button>
            }
            totalCount={totalCount}
        />
    )
}