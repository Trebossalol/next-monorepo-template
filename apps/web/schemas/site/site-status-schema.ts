import z from "zod";

export const siteStatusSchema = z.enum([
    "Active",
    "Inactive",
    "Deleted",
])

export type SiteStatusSchema = z.infer<typeof siteStatusSchema>;