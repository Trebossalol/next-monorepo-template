import { z } from "zod"
import { ExampleStatus } from "@/types/dto/example/example-table"

export const createExampleItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    status: z.nativeEnum(ExampleStatus),
    description: z.string().optional(),
})

export const updateExampleItemSchema = createExampleItemSchema.extend({
    id: z.string(),
})

export type CreateExampleItemSchema = z.infer<typeof createExampleItemSchema>
export type UpdateExampleItemSchema = z.infer<typeof updateExampleItemSchema>

