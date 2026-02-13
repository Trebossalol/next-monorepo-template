'use client'

import NiceModal from '@ebay/nice-modal-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle
} from '@workspace/ui/components/alert-dialog'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { removeSite } from '@/actions/site/remove-site'
import { useEnhancedModal } from '@/hooks/use-enhanced-modal'

type RemoveSiteModalProps = {
	siteId: string
}

export const RemoveSiteModal = NiceModal.create(
	(props: RemoveSiteModalProps) => {
		const modal = useEnhancedModal()
		const { siteId } = props

		const handleRemove = async () => {
			try {
				await removeSite({ id: siteId })
				toast.success('Site removed successfully')
			} catch (error) {
				console.error(error)
				toast.error('Failed to remove site')
			} finally {
				modal.handleClose()
			}
		}

		return (
			<AlertDialog open={modal.visible} onOpenChange={modal.handleOpenChange}>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
							<Trash2Icon />
						</AlertDialogMedia>
						<AlertDialogTitle>Remove site?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently remove this site from the system.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
						<AlertDialogAction variant="destructive" onClick={handleRemove}>
							Remove
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
	}
)
