import { z } from 'zod'

export const signUpSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(8, 'Password is required')
})

export type SignUpSchema = z.infer<typeof signUpSchema>
