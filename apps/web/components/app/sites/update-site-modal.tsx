'use client'

import NiceModal from '@ebay/nice-modal-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { capitalize } from '@workspace/common/utils/labels'
import { Button } from '@workspace/ui/components/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@workspace/ui/components/dialog'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@workspace/ui/components/select'
import { Textarea } from '@workspace/ui/components/textarea'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateSite } from '@/actions/site/update-site'
import { useEnhancedModal } from '@/hooks/use-enhanced-modal'
import { siteStatusSchema } from '@/schemas/site/site-status-schema'
import {
	type UpdateSiteSchema,
	updateSiteSchema
} from '@/schemas/site/update-site-schema'
import type { SiteDto } from '@/types/dto/site/site-dto'

type UpdateSiteModalProps = {
	site: SiteDto
}

export const UpdateSiteModal = NiceModal.create(
	(props: UpdateSiteModalProps) => {
		const { site } = props
		const modal = useEnhancedModal()

		const form = useForm<UpdateSiteSchema>({
			resolver: zodResolver(updateSiteSchema),
			defaultValues: {
				id: site.id,
				changes: {
					name: site.name,
					description: site.description ?? undefined,
					status: site.status
				}
			}
		})

		const onSubmit = async (data: UpdateSiteSchema) => {
			try {
				await updateSite(data)
				toast.success('Site updated successfully')
			} catch (error) {
				console.error(error)
				toast.error('Failed to update site')
			} finally {
				modal.handleClose()
			}
		}

		return (
			<Dialog open={modal.visible} onOpenChange={modal.handleOpenChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update Site</DialogTitle>
						<DialogDescription>Update the site details.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="changes.name"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="name">Name</FieldLabel>
											<Input {...field} id="name" />
											{fieldState.error && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									name="changes.description"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="description">Description</FieldLabel>
											<Textarea {...field} id="description" />
											<FieldDescription>
												Enter a description for the site
											</FieldDescription>
											{fieldState.error && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									name="changes.status"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="status">Status</FieldLabel>
											<Select {...field} value={field.value ?? undefined}>
												<SelectTrigger>
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
												<SelectContent>
													{siteStatusSchema.options.map((status) => (
														<SelectItem key={status} value={status}>
															{capitalize(status)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											{fieldState.error && (
												<FieldError errors={[fieldState.error]} />
											)}
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
						<Button type="submit" onClick={form.handleSubmit(onSubmit)}>
							Update Site
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
)
