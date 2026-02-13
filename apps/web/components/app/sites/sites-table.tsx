'use client'

import NiceModal from '@ebay/nice-modal-react'
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState
} from '@tanstack/react-table'
import { capitalize, getInitials } from '@workspace/common/utils/labels'
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
	createSelectionColumn,
	DataTable,
	DataTableBulkActions,
	type FilterConfig,
	SortableColumnHeader
} from '@workspace/ui/components/custom/data-table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { format } from 'date-fns'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'
import * as React from 'react'
import { useMemo } from 'react'
import { bulkRemoveSites } from '@/actions/site/bulk-remove'
import { AddSiteModal } from '@/components/app/sites/add-site-modal'
import { RemoveSiteModal } from '@/components/app/sites/remove-site-modal'
import { UpdateSiteModal } from '@/components/app/sites/update-site-modal'
import { ConfirmationModal } from '@/components/generic/modals/confirmation-modal'
import { useTransitionContext } from '@/hooks/use-transition-context'
import {
	type SiteStatusSchema,
	siteStatusSchema
} from '@/schemas/site/site-status-schema'
import type { SiteDto } from '@/types/dto/site/site-dto'
import { SortOrder } from '@/types/utils'
import { type SortBy, searchParams } from './search-params'

interface ExampleTableProps {
	sites: SiteDto[]
	totalCount: number
}

export function ExampleTable({ sites, totalCount }: ExampleTableProps) {
	const { startTransition, isLoading } = useTransitionContext()

	const [
		{ query, pageIndex, pageSize, status, sortBy, selectedRows, sortOrder },
		setSearchParams
	] = useQueryStates(searchParams)

	const handleSortingChange = (newSorting: SortingState): void => {
		const [sort] = newSorting
		if (!sort) return
		setSearchParams(
			{
				sortBy: sort.id as SortBy,
				sortOrder: sort.desc ? SortOrder.Desc : SortOrder.Asc,
				pageIndex: 0
			},
			{ startTransition }
		)
	}

	const handleFiltersChange = (filters: ColumnFiltersState): void => {
		const getFilterValue = (id: string): string[] => {
			const filter = filters.find((f) => f.id === id)
			return Array.isArray(filter?.value) ? (filter.value as string[]) : []
		}

		setSearchParams(
			{ status: getFilterValue('status') as SiteStatusSchema[], pageIndex: 0 },
			{ startTransition }
		)
	}

	const handleRowSelectionChange = (
		newSelection: Record<string, boolean>
	): void => {
		setSearchParams({ selectedRows: Object.keys(newSelection) })
	}

	const handleEditRow = (item: SiteDto) => {
		NiceModal.show(UpdateSiteModal, { site: item })
	}

	const handleAddRow = () => {
		NiceModal.show(AddSiteModal)
	}

	const handleDeleteRow = (item: SiteDto) => {
		NiceModal.show(RemoveSiteModal, { siteId: item.id })
	}

	const handleBulkDelete = () => {
		NiceModal.show(ConfirmationModal, {
			title: 'Delete Selected Sites',
			message: `Delete ${selectedRows.length} site${selectedRows.length > 1 ? 's' : ''}?`,
			confirmLabel: 'Delete',
			onConfirm: () =>
				bulkRemoveSites({
					siteIds: selectedRows
				})
		})
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a memoized column definition that should not be re-created on every render
	const columns: ColumnDef<SiteDto>[] = React.useMemo(
		() => [
			createSelectionColumn<SiteDto>(),
			{
				accessorKey: 'name',
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
				)
			},
			{
				accessorKey: 'description',
				header: ({ column }) => (
					<SortableColumnHeader column={column} title="Description" />
				),
				cell: ({ row }) => (
					<Badge
						className={cn(
							'border-none px-2 py-0.5 font-medium text-foreground text-xs shadow-none'
						)}
						variant="outline"
					>
						{row.original.description ?? '-'}
					</Badge>
				)
			},
			{
				accessorKey: 'status',
				header: ({ column }) => (
					<SortableColumnHeader column={column} title="Status" />
				),
				cell: ({ row }) => (
					<Badge variant="outline">{capitalize(row.original.status)}</Badge>
				)
			},
			{
				accessorKey: 'createdBy',
				header: ({ column }) => (
					<SortableColumnHeader column={column} title="Created By" />
				),
				cell: ({ row }) => {
					return (
						<div className="flex max-w-[200px] items-center gap-2">
							<Avatar className="size-6 shrink-0">
								<AvatarFallback className="bg-muted">
									<span className="text-xs">
										{getInitials(row.original.createdBy.name)}
									</span>
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
				}
			},
			{
				accessorKey: 'createdAt',
				header: ({ column }) => (
					<SortableColumnHeader column={column} title="Created" />
				),
				cell: ({ row }) => (
					<span className="text-foreground/80">
						{format(row.original.createdAt, 'dd MMM, yyyy')}
					</span>
				)
			},
			{
				id: 'actions',
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
								<DropdownMenuItem onClick={() => handleEditRow(row.original)}>
									Edit
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => handleDeleteRow(row.original)}
									className="text-destructive focus:text-destructive"
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)
			}
		],
		[]
	)

	const filters: FilterConfig[] = [
		{
			key: 'status',
			title: 'Status',
			options: siteStatusSchema.options.map((status) => ({
				value: status,
				label: capitalize(status)
			}))
		}
	]

	const sortingState: SortingState = useMemo(() => {
		return [{ id: sortBy, desc: sortOrder === SortOrder.Desc }]
	}, [sortBy, sortOrder])

	const columnFilters: ColumnFiltersState = React.useMemo(() => {
		const filters: ColumnFiltersState = []
		if (status && status.length > 0) {
			filters.push({ id: 'status', value: status })
		}
		return filters
	}, [status])

	const rowSelectionState: Record<string, boolean> = useMemo(() => {
		return selectedRows.reduce(
			(acc, row) => {
				acc[row] = true
				return acc
			},
			{} as Record<string, boolean>
		)
	}, [selectedRows])

	return (
		<DataTable
			columns={columns}
			data={sites}
			emptyMessage="No items found."
			enableFilters
			enablePagination
			enableRowSelection
			enableSearch
			loading={isLoading}
			columnFilters={columnFilters}
			sorting={sortingState}
			filters={filters}
			pageIndex={pageIndex}
			pageSize={pageSize}
			searchQuery={query}
			rowSelection={rowSelectionState}
			onFiltersChange={handleFiltersChange}
			onPageIndexChange={(index) =>
				setSearchParams({ pageIndex: index }, { startTransition })
			}
			onPageSizeChange={(size) =>
				setSearchParams({ pageSize: size, pageIndex: 0 }, { startTransition })
			}
			onRowSelectionChange={handleRowSelectionChange}
			onSearchQueryChange={(value) =>
				setSearchParams(
					{ query: value ?? null, pageIndex: 0 },
					{ startTransition }
				)
			}
			onSortingChange={handleSortingChange}
			searchPlaceholder="Search items..."
			toolbarActions={
				<Button onClick={handleAddRow} size="sm">
					<PlusIcon className="size-4 shrink-0" />
					Add Item
				</Button>
			}
			renderBulkActions={(table) => (
				<DataTableBulkActions
					table={table}
					actions={[
						{
							label: 'Delete',
							onClick: handleBulkDelete
						}
					]}
				/>
			)}
			totalCount={totalCount}
		/>
	)
}
