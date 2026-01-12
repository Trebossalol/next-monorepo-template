"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"
import { ExampleItem, ExampleStatus } from "@/types/dto/example/example-table"
import {
    createExampleItemSchema,
    updateExampleItemSchema,
    type CreateExampleItemSchema,
    type UpdateExampleItemSchema,
} from "@/schemas/example/example-item-schema"

interface ExampleItemDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    item?: ExampleItem
    onSave: (data: CreateExampleItemSchema | UpdateExampleItemSchema) => void | Promise<void>
}

function capitalize(str: string): string {
    if (!str) return str
    if (str.length === 1) return str.charAt(0).toUpperCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function ExampleItemDialog({
    open,
    onOpenChange,
    item,
    onSave,
}: ExampleItemDialogProps) {
    const isEditing = !!item
    const schema = isEditing ? updateExampleItemSchema : createExampleItemSchema

    const form = useForm<CreateExampleItemSchema | UpdateExampleItemSchema>({
        resolver: zodResolver(schema),
        defaultValues: isEditing
            ? {
                id: item.id,
                name: item.name,
                email: item.email,
                status: item.status,
                description: item.description ?? "",
            }
            : {
                name: "",
                email: "",
                status: ExampleStatus.Active,
                description: "",
            },
    })

    React.useEffect(() => {
        if (open && item) {
            form.reset({
                id: item.id,
                name: item.name,
                email: item.email,
                status: item.status,
                description: item.description ?? "",
            })
        } else if (open && !item) {
            form.reset({
                name: "",
                email: "",
                status: ExampleStatus.Active,
                description: "",
            })
        }
    }, [open, item, form])

    const onSubmit = async (data: CreateExampleItemSchema | UpdateExampleItemSchema) => {
        try {
            await onSave(data)
            toast.success(isEditing ? "Item updated successfully" : "Item created successfully")
            onOpenChange(false)
            form.reset()
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : isEditing
                        ? "Failed to update item"
                        : "Failed to create item",
            )
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Item" : "Add Item"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the item details below."
                            : "Fill in the details to create a new item."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input {...field} id="name" aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        type="email"
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="status"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="status">Status</FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        name={field.name}
                                    >
                                        <SelectTrigger id="status" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ExampleStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {capitalize(status)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <FieldDescription>Optional description for this item.</FieldDescription>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        aria-invalid={fieldState.invalid}
                                        rows={3}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={form.formState.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={form.formState.isSubmitting}>
                            {isEditing ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

