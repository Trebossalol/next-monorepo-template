import NiceModal from '@ebay/nice-modal-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@workspace/ui/components/alert-dialog'
import { useEnhancedModal } from '@/hooks/use-enhanced-modal'

export type ConfirmationModalProps = {
	title: string
	message: string
	confirmLabel?: string
	onConfirm: () => void
}

export const ConfirmationModal = NiceModal.create(
	({ title, message, confirmLabel, onConfirm }: ConfirmationModalProps) => {
		const { visible, handleOpenChange } = useEnhancedModal()

		return (
			<AlertDialog open={visible} onOpenChange={handleOpenChange}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{message}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>
							{confirmLabel ?? 'Confirm'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
	}
)
