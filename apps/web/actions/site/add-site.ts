'use server';

import { authActionClient } from "@/lib/safe-action";
import { addSiteSchema } from "@/schemas/site/add-site-schema";
import { prisma } from "@workspace/database/client";

export const addSite = authActionClient
    .metadata({ actionName: "addSite" })
    .inputSchema(addSiteSchema)
    .action(async ({ parsedInput, ctx }) => {
        const site = await prisma.site.create({
            data: {
                name: parsedInput.name,
                description: parsedInput.description,
                createdById: ctx.user.id
            },
        });

        return site;
    });