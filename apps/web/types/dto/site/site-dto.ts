import type { Site } from '@workspace/database/index'
import type { UserDto } from '../account/user-dto'

export type SiteDto = Site & {
	createdBy: UserDto
}
