import { z } from "zod";
import { SiteStatus } from "@workspace/database/index";

export const updateSiteSchema = z.object({
    id: z.string().uuid("Invalid site ID"),
    changes: z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        status: z.nativeEnum(SiteStatus).optional(),
    }),
});

export type UpdateSiteSchema = z.infer<typeof updateSiteSchema>;