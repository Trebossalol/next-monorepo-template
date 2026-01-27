import { Site } from "@workspace/database/index";
import { UserDto } from "../account/user-dto";

export type SiteDto = Site & {
    createdBy: UserDto;
}