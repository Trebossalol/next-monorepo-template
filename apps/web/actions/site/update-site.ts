'use server';

import { authActionClient } from "@/lib/safe-action";
import { updateSiteSchema } from "@/schemas/site/update-site-schema";
import { prisma } from "@workspace/database/client";
import { updateTag } from "next/cache";
import { CacheNamespace } from "@/lib/caching";

export const updateSite = authActionClient
    .metadata({ actionName: "updateSite" })
    .inputSchema(updateSiteSchema)
    .action(async ({ parsedInput }) => {
        await prisma.site.update({
            where: { id: parsedInput.id },
            data: parsedInput.changes,
        });

        updateTag(CacheNamespace.Sites)
    });