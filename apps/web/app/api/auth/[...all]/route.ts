import { auth } from "@workspace/auth/lib/auth";
import { toNextJsHandler } from "@workspace/auth/lib/index";

export const { POST, GET } = toNextJsHandler(auth);