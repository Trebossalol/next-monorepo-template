import { z } from 'zod'

export const removeSiteSchema = z.object({
	id: z.string().uuid('Invalid site ID')
})

export type RemoveSiteSchema = z.infer<typeof removeSiteSchema>
