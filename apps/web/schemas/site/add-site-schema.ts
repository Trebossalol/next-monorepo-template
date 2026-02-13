import { z } from 'zod'

export const addSiteSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional()
})

export type AddSiteSchema = z.infer<typeof addSiteSchema>
