"use client"

import * as React from "react"
import { useQueryStates } from "nuqs"
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { toast } from "sonner"
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
import { ExampleItem, ExampleStatus } from "@/types/dto/example/example-table"
import { searchParams, type SortField, VALID_SORT_FIELDS } from "./search-params"
import { ExampleItemDialog } from "./example-item-dialog"
import { ConfirmationDialog } from "./confirmation-dialog"
import type {
    CreateExampleItemSchema,
    UpdateExampleItemSchema,
} from "@/schemas/example/example-item-schema"
import { cn } from "@workspace/ui/lib/utils"

const DEFAULT_PAGE_SIZE = 25
const DEFAULT_SORT_BY = "createdAt"
const DEFAULT_SORT_ORDER = "asc" as const
const DEFAULT_SORTING: SortingState = [{ id: DEFAULT_SORT_BY, desc: false }]

function capitalize(str: string): string {
    if (!str) return str
    if (str.length === 1) return str.charAt(0).toUpperCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getInitials(name: string): string {
    if (!name) return ""
    return name
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .slice(0, 2)
        .map((v) => v?.[0]?.toUpperCase())
        .join("")
}

const statusColors: Record<ExampleStatus, string> = {
    [ExampleStatus.Active]: "bg-green-100 dark:bg-green-900",
    [ExampleStatus.Inactive]: "bg-red-100 dark:bg-red-900",
    [ExampleStatus.Pending]: "bg-yellow-100 dark:bg-yellow-900",
}

interface ExampleTableProps {
    initialData: ExampleItem[]
}

export function ExampleTable({ initialData }: ExampleTableProps) {
    const [data, setData] = React.useState<ExampleItem[]>(initialData)
    const [rowSelection, setRowSelection] = React.useState({})
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [confirmationOpen, setConfirmationOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState<ExampleItem | undefined>()
    const [itemToDelete, setItemToDelete] = React.useState<ExampleItem | undefined>()

    const [{ query, pageIndex, pageSize, status, sortBy, sortOrder }, setSearchParams] =
        useQueryStates(searchParams)

    const sorting: SortingState = React.useMemo(() => {
        const by = sortBy ?? DEFAULT_SORT_BY
        const order = sortOrder ?? DEFAULT_SORT_ORDER
        return [{ id: by, desc: order === "desc" }]
    }, [sortBy, sortOrder])

    const columnFilters: ColumnFiltersState = React.useMemo(() => {
        const filters: ColumnFiltersState = []
        const statusArray = Array.isArray(status) ? status : status ? [status] : []
        if (statusArray.length > 0) {
            filters.push({ id: "status", value: statusArray })
        }
        return filters
    }, [status])

    const handleFiltersChange = (filters: ColumnFiltersState): void => {
        const statusFilter = filters.find((f) => f.id === "status")
        const statusValues = Array.isArray(statusFilter?.value)
            ? (statusFilter.value as string[])
            : []
        setSearchParams({
            status: statusValues.length > 0 ? statusValues : [],
            pageIndex: 0
        })
    }

    const isValidSortField = (id: string): id is SortField => {
        return (VALID_SORT_FIELDS as readonly string[]).includes(id)
    }

    const handleSortingChange = (newSorting: SortingState): void => {
        const firstSort = newSorting[0]
        if (firstSort && isValidSortField(firstSort.id)) {
            setSearchParams({
                sortBy: firstSort.id,
                sortOrder: firstSort.desc ? "desc" : "asc",
                pageIndex: 0,
            })
        } else {
            setSearchParams({
                sortBy: DEFAULT_SORT_BY,
                sortOrder: DEFAULT_SORT_ORDER,
                pageIndex: 0,
            })
        }
    }

    // Filter and sort data client-side
    const filteredData = React.useMemo(() => {
        let filtered = [...data]

        // Apply search query
        if (query) {
            const searchLower = query.toLowerCase()
            filtered = filtered.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchLower) ||
                    item.email.toLowerCase().includes(searchLower) ||
                    item.description?.toLowerCase().includes(searchLower),
            )
        }

        // Apply status filter
        const statusArray = Array.isArray(status) ? status : status ? [status] : []
        if (statusArray.length > 0) {
            filtered = filtered.filter((item) => statusArray.includes(item.status))
        }

        // Apply sorting
        const currentSort = sorting[0] ?? DEFAULT_SORTING[0]
        if (currentSort) {
            filtered.sort((a, b) => {
                const aValue = a[currentSort.id as keyof ExampleItem]
                const bValue = b[currentSort.id as keyof ExampleItem]

                if (aValue === null || aValue === undefined) return 1
                if (bValue === null || bValue === undefined) return -1

                if (aValue < bValue) return currentSort.desc ? 1 : -1
                if (aValue > bValue) return currentSort.desc ? -1 : 1
                return 0
            })
        }

        return filtered
    }, [data, query, status, sorting])

    // Pagination
    const paginatedData = React.useMemo(() => {
        const start = (pageIndex ?? 0) * (pageSize ?? DEFAULT_PAGE_SIZE)
        const end = start + (pageSize ?? DEFAULT_PAGE_SIZE)
        return filteredData.slice(start, end)
    }, [filteredData, pageIndex, pageSize])

    const handleSave = async (formData: CreateExampleItemSchema | UpdateExampleItemSchema) => {
        if ("id" in formData) {
            // Update
            setData((prev) =>
                prev.map((item) =>
                    item.id === formData.id
                        ? {
                            ...item,
                            name: formData.name,
                            email: formData.email,
                            status: formData.status,
                            description: formData.description,
                        }
                        : item,
                ),
            )
        } else {
            // Create
            const newItem: ExampleItem = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                status: formData.status,
                description: formData.description,
                createdAt: new Date(),
            }
            setData((prev) => [newItem, ...prev])
        }
    }

    const handleDelete = async () => {
        if (!itemToDelete) return
        setData((prev) => prev.filter((item) => item.id !== itemToDelete.id))
        setConfirmationOpen(false)
        setItemToDelete(undefined)
        toast.success("Item deleted successfully")
    }

    const handleEdit = (item: ExampleItem) => {
        setSelectedItem(item)
        setDialogOpen(true)
    }

    const handleAdd = () => {
        setSelectedItem(undefined)
        setDialogOpen(true)
    }

    const handleDeleteClick = (item: ExampleItem) => {
        setItemToDelete(item)
        setConfirmationOpen(true)
    }

    const columns: ColumnDef<ExampleItem>[] = React.useMemo(
        () => [
            createSelectionColumn<ExampleItem>(),
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Name" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex max-w-[200px] items-center gap-2">
                            <Avatar className="size-6 shrink-0">
                                <AvatarFallback className="bg-muted">
                                    <span className="text-xs">{getInitials(row.original.name)}</span>
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className="truncate font-medium text-foreground"
                                title={row.original.name}
                            >
                                {row.original.name}
                            </span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "email",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Email" />
                ),
                cell: ({ row }) => (
                    <span
                        className="block max-w-[250px] truncate text-foreground/80"
                        title={row.original.email}
                    >
                        {row.original.email}
                    </span>
                ),
            },
            {
                accessorKey: "status",
                header: ({ column }) => (
                    <SortableColumnHeader column={column} title="Status" />
                ),
                cell: ({ row }) => (
                    <Badge
                        className={cn(
                            "border-none px-2 py-0.5 font-medium text-foreground text-xs shadow-none",
                            statusColors[row.original.status] ||
                            "bg-gray-100 dark:bg-gray-800",
                        )}
                        variant="outline"
                    >
                        {capitalize(row.original.status)}
                    </Badge>
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
            options: Object.values(ExampleStatus).map((status) => ({
                value: status,
                label: capitalize(status),
            })),
        },
    ]

    return (
        <>
            <DataTable
                columnFilters={columnFilters}
                columns={columns}
                data={paginatedData}
                emptyMessage="No items found."
                enableFilters
                enablePagination
                enableRowSelection
                enableSearch
                filters={statusFilters}
                loading={false}
                onFiltersChange={handleFiltersChange}
                onPageIndexChange={(index) => setSearchParams({ pageIndex: index })}
                onPageSizeChange={(size) => {
                    setSearchParams({ pageSize: size, pageIndex: 0 })
                }}
                onRowSelectionChange={setRowSelection}
                onSearchQueryChange={(value) => {
                    setSearchParams({ query: value || null, pageIndex: 0 })
                }}
                onSortingChange={handleSortingChange}
                pageIndex={pageIndex ?? 0}
                pageSize={pageSize ?? DEFAULT_PAGE_SIZE}
                rowSelection={rowSelection}
                searchPlaceholder="Search items..."
                searchQuery={query ?? ""}
                defaultSorting={DEFAULT_SORTING}
                sorting={sorting}
                toolbarActions={
                    <Button onClick={handleAdd} size="sm">
                        <PlusIcon className="size-4 shrink-0" />
                        Add Item
                    </Button>
                }
                totalCount={filteredData.length}
            />
            <ExampleItemDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                item={selectedItem}
                onSave={handleSave}
            />
            <ConfirmationDialog
                open={confirmationOpen}
                onOpenChange={setConfirmationOpen}
                title="Delete item?"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmLabel="Delete"
                destructive
                onConfirm={handleDelete}
            />
        </>
    )
}

