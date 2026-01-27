'use client'

import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import NiceModal from "@ebay/nice-modal-react"
import { useEnhancedModal } from "@/hooks/use-enhanced-modal"
import { AddSiteSchema, addSiteSchema } from "@/schemas/site/add-site-schema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { addSite } from "@/actions/site/add-site"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export const AddSiteModal = NiceModal.create(() => {
    const modal = useEnhancedModal()

    const form = useForm<AddSiteSchema>({
        resolver: zodResolver(addSiteSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    })

    const onSubmit = async (data: AddSiteSchema) => {
        try {
            await addSite(data)
            toast.success("Site added successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to add site")
        } finally {
            modal.handleClose()
        }
    }

    return (
        <Dialog open={modal.visible} onOpenChange={modal.handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Site</DialogTitle>
                    <DialogDescription>
                        Add a new site to the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Name
                                        </FieldLabel>
                                        <Input {...field} id="name" />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="description">
                                            Description
                                        </FieldLabel>
                                        <Textarea {...field} id="description" />
                                        <FieldDescription>
                                            Enter a description for the site
                                        </FieldDescription>
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Add Site</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
})
