import z from 'zod'

export const updatePersonalDetailsSchema = z.object({
	name: z.string().min(1, 'Name is required')
})

export type UpdatePersonalDetailsSchema = z.infer<
	typeof updatePersonalDetailsSchema
>
