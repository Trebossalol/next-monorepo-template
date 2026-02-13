import 'server-only'

import { prisma } from '@workspace/database/client'
import { cacheTag } from 'next/cache'
import type { searchParamsCache } from '@/components/app/sites/search-params'
import { CacheNamespace } from '@/lib/caching'
import type { SiteDto } from '@/types/dto/site/site-dto'

type GetSitesOptions = Awaited<ReturnType<typeof searchParamsCache.parse>>

export const getSites = async (
	options: GetSitesOptions
): Promise<{ sites: SiteDto[]; totalCount: number }> => {
	'use cache'
	cacheTag(CacheNamespace.Sites)

	const { query, pageIndex, pageSize, status, sortBy, sortOrder } = options

	const [sites, totalCount] = await Promise.all([
		prisma.site.findMany({
			where: {
				OR: [
					{ name: { contains: query, mode: 'insensitive' } },
					{ description: { contains: query, mode: 'insensitive' } }
				],
				status: status.length > 0 ? { in: status } : undefined
			},
			orderBy: {
				[sortBy]: sortOrder
			},
			skip: pageIndex * pageSize,
			take: pageSize,
			include: {
				createdBy: {
					select: {
						id: true,
						name: true,
						email: true
					}
				}
			}
		}),
		prisma.site.count()
	])

	return { sites, totalCount }
}
