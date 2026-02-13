import { z } from 'zod'
import { siteStatusSchema } from './site-status-schema'

export const updateSiteSchema = z.object({
	id: z.string().uuid('Invalid site ID'),
	changes: z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		status: siteStatusSchema.optional()
	})
})

export type UpdateSiteSchema = z.infer<typeof updateSiteSchema>
