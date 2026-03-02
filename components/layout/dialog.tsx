// Dialog.tsx
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

export interface Message {
  title: string
  description?: string
  callback?: () => void
}

interface DialogProps {
  open: boolean
  setOpen: (value: boolean) => void
  title?: string
  description?: string
  onActionClick?: () => void
}

export function Dialog({ open, setOpen, title, description, onActionClick }: DialogProps) {
  const handleAction = () => {
    setOpen(false)
    if (onActionClick) {
      onActionClick()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAction}>Fechar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
