'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	type UpdatePersonalDetailsSchema,
	updatePersonalDetailsSchema
} from '@/schemas/auth/update-personal-details-schema'
import type { PersonalDetailsDto } from '@/types/dto/account/personal-details-dto'

type UpdatePersonalDetailsFormProps = {
	personalDetails: PersonalDetailsDto
}

export default function UpdatePersonalDetailsForm({
	personalDetails
}: UpdatePersonalDetailsFormProps) {
	const form = useForm<UpdatePersonalDetailsSchema>({
		resolver: zodResolver(updatePersonalDetailsSchema),
		defaultValues: {
			name: personalDetails.name
		}
	})

	const onSubmit = async (data: UpdatePersonalDetailsSchema) => {
		console.log(data)
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<FieldGroup>
				<Controller
					name="name"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="name">Name</FieldLabel>
							<FieldDescription>Edit your display name.</FieldDescription>
							<Input {...field} id="name" aria-invalid={fieldState.invalid} />
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<FieldDescription>
						This is your email address and cannot be changed.
					</FieldDescription>
					<Input id="email" disabled value={personalDetails.email} />
				</Field>
			</FieldGroup>

			<div className="flex items-center justify-end">
				<Button type="submit" size="sm">
					Save changes
				</Button>
			</div>
		</form>
	)
}
