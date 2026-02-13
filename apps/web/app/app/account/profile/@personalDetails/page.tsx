import { Card, CardContent } from '@workspace/ui/components/card'
import { notFound } from 'next/navigation'
import React from 'react'
import UpdatePersonalDetailsForm from '@/components/app/account/profile/update-personal-details-form'
import { getPersonalDetails } from '@/data/account/profile/get-personal-details'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function PersonalDetailsPage() {
	await getSafeAuthSession()

	const [personalDetails] = await Promise.all([getPersonalDetails()])

	if (!personalDetails) notFound()

	return (
		<Card>
			<CardContent>
				<UpdatePersonalDetailsForm personalDetails={personalDetails} />
			</CardContent>
		</Card>
	)
}
