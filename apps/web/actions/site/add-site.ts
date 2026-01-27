'use server';

import { authActionClient } from "@/lib/safe-action";
import { addSiteSchema } from "@/schemas/site/add-site-schema";
import { prisma } from "@workspace/database/client";
import { updateTag } from "next/cache";
import { CacheNamespace } from "@/lib/caching";

export const addSite = authActionClient
    .metadata({ actionName: "addSite" })
    .inputSchema(addSiteSchema)
    .action(async ({ parsedInput, ctx }) => {
        await prisma.site.create({
            data: {
                name: parsedInput.name,
                description: parsedInput.description,
                createdById: ctx.user.id
            },
        });

        updateTag(CacheNamespace.Sites)
    });