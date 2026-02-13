import 'server-only'
import { getSafeAuthSession } from '@/lib/server-utils'
import type { PersonalDetailsDto } from '@/types/dto/account/personal-details-dto'

export const getPersonalDetails =
	async (): Promise<PersonalDetailsDto | null> => {
		const session = await getSafeAuthSession()

		return {
			name: session.user.name,
			email: session.user.email
		}
	}
