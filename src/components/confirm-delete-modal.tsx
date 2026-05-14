import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isLoading?: boolean;
    logout?: boolean;
    title?: string;
}

const ConfirmDeleteDialog = ({
    open,
    onOpenChange,
    onConfirm,
    isLoading,
    logout,
    title,
}: ConfirmDeleteDialogProps) => {
    const dialogTitle = logout ? 'Log out?' : `Delete ${title}?`;
    const dialogDescription = logout
        ? 'Are you sure you want to log out?'
        : `Are you sure you want to delete ${title}? This action cannot be undone.`;
    const confirmText = logout
        ? isLoading
            ? 'Logging out...'
            : 'Log out'
        : isLoading
          ? 'Deleting...'
          : 'Delete';

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {logout ? (
                            dialogTitle
                        ) : (
                            <>
                                Delete <span className="text-destructive">{title}</span>?
                            </>
                        )}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="bg-destructive text-white hover:bg-destructive/80"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDeleteDialog;
