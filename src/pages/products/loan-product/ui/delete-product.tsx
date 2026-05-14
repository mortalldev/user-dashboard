import ConfirmDeleteDialog from '@/components/confirm-delete-modal';
import { useDeleteProductMutation } from '@/features/products';
import type { ProductData } from '@/features/products/type';
import { toast } from 'sonner';

interface DeleteProductProps {
    product: ProductData;
    openDelete: boolean;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProduct = ({ openDelete, setOpenDelete, product }: DeleteProductProps) => {
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id).unwrap();
            toast.success('Product deleted');
            setOpenDelete(false);
        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
        }
    };

    return (
        <ConfirmDeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            onConfirm={handleDelete}
            title={product.title_en}
            isLoading={isLoading}
        />
    );
};

export default DeleteProduct;
