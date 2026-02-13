import { z } from 'zod'

export const bulkRemoveSiteSchema = z.object({
	siteIds: z.array(z.string())
})

export type BulkRemoveSiteSchema = z.infer<typeof bulkRemoveSiteSchema>
