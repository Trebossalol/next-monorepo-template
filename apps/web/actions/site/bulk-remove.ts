'use server';

import { authActionClient } from "@/lib/safe-action";
import { prisma } from "@workspace/database/client";
import { updateTag } from "next/cache";
import { CacheNamespace } from "@/lib/caching";
import { bulkRemoveSiteSchema } from "@/schemas/site/bulk-remove-site-schema";

export const bulkRemoveSites = authActionClient
    .metadata({ actionName: "bulkRemoveSites" })
    .inputSchema(bulkRemoveSiteSchema)
    .action(async ({ parsedInput }) => {
        await prisma.site.deleteMany({
            where: { id: { in: parsedInput.siteIds } }
        });

        updateTag(CacheNamespace.Sites)
    });