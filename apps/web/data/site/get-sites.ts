import 'server-only'
import { searchParamsCache } from '@/components/app/example-table/search-params'
import { SiteDto } from '@/types/dto/site/site-dto'
import { cacheTag } from 'next/cache'
import { CacheNamespace } from '@/lib/caching'
import { prisma } from '@workspace/database/client'

export const getSites = async (): Promise<{ sites: SiteDto[]; totalCount: number }> => {

    'use cache'
    cacheTag(CacheNamespace.Sites)

    const { pageIndex, pageSize, sortBy, sortOrder } = searchParamsCache.all()

    const [sites, totalCount] = await Promise.all([
        prisma.site.findMany({
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
