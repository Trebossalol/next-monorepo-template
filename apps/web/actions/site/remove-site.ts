'use server';

import { authActionClient } from "@/lib/safe-action";
import { removeSiteSchema } from "@/schemas/site/remove-site-schema";
import { prisma } from "@workspace/database/client";
import { updateTag } from "next/cache";
import { CacheNamespace } from "@/lib/caching";

export const removeSite = authActionClient
    .metadata({ actionName: "removeSite" })
    .inputSchema(removeSiteSchema)
    .action(async ({ parsedInput }) => {
        await prisma.site.delete({
            where: { id: parsedInput.id }
        });

        updateTag(CacheNamespace.Sites)
    });