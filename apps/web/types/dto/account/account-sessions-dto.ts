export type AccountSessionDto = {
	id: string
	createdAt: Date
	updatedAt: Date
	userId: string
	expiresAt: Date
	token: string
	ipAddress?: string | null | undefined | undefined
	userAgent?: string | null | undefined | undefined
} & {
	id: string
	createdAt: Date
	updatedAt: Date
	userId: string
	expiresAt: Date
	token: string
	ipAddress?: string | null | undefined | undefined
	userAgent?: string | null | undefined | undefined
	impersonatedBy?: string | null | undefined
}
