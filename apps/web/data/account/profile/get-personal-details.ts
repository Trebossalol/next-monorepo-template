import 'server-only'
import { PersonalDetailsDto } from '@/types/dto/account/personal-details-dto'
import { getSafeAuthSession } from '@/lib/server-utils'

export const getPersonalDetails = async (): Promise<PersonalDetailsDto | null> => {
    const session = await getSafeAuthSession()

    return {
        name: session.user.name,
        email: session.user.email
    }
}