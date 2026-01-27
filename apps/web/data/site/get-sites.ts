import 'server-only'

import { searchParamsCache } from '@/components/app/sites/search-params'
import { SiteDto } from '@/types/dto/site/site-dto'
import { cacheTag } from 'next/cache'
import { CacheNamespace } from '@/lib/caching'
import { prisma } from '@workspace/database/client'

type GetSitesOptions = Awaited<ReturnType<typeof searchParamsCache.parse>>

export const getSites = async (options: GetSitesOptions): Promise<{ sites: SiteDto[]; totalCount: number }> => {
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
                status: { in: status }
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
                        email: true,
                    },
                }
            }
        }),
        prisma.site.count()
    ])

    return { sites, totalCount }
}
