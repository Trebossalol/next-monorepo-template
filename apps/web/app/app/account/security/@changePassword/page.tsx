import React from 'react'
import ChangePasswordCard from '@/components/app/account/security/change-password-card'
import { getSafeAuthSession } from '@/lib/server-utils'

export default async function ChangePasswordPage() {
	await getSafeAuthSession()

	return <ChangePasswordCard />
}
