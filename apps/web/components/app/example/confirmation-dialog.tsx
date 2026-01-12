"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface ConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void | Promise<void>
    destructive?: boolean
}

export function ConfirmationDialog({
    open,
    onOpenChange,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    destructive = false,
}: ConfirmationDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm()
            onOpenChange(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className={cn(
                            destructive &&
                            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        )}
                    >
                        {isLoading ? "Processing..." : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

