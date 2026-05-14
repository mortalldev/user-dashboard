import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { editProductSchema, type EditProductFormValues } from '@/shared/lib/validations/product';
import { toast } from 'sonner';
import { useUpdateProductMutation } from '@/features/products';
import type { ProductData } from '@/features/products/type';
import { useEffect } from 'react';

interface EditProductFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    product: ProductData;
}

const EditProductForm = ({ open, setOpen, product }: EditProductFormProps) => {
    const [editProduct, { isLoading }] = useUpdateProductMutation();

    const form = useForm<EditProductFormValues>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            productId: product.id,
            body: {
                title_en: product.title_en ?? '',
                title_uz: product.title_uz ?? '',
                title_ru: product.title_ru ?? '',
                type: product.type ?? 'CARD',
                max_amount: product.max_amount ?? undefined,
                percent: product.percent ? Number(product.percent) : undefined,
            },
        },
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = async (data: EditProductFormValues) => {
        try {
            const res = await editProduct(data).unwrap();

            if (res) {
                toast.success('Product edited');
                setOpen(false);
                form.reset();
            }
        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        form.reset();
    };

    useEffect(() => {
        form.reset({
            productId: product.id,
            body: {
                title_en: product.title_en ?? '',
                title_uz: product.title_uz ?? '',
                title_ru: product.title_ru ?? '',
                type: product.type ?? 'CARD',
                max_amount: product.max_amount ?? undefined,
                percent: product.percent ? Number(product.percent) : undefined,
            },
        });
    }, [product]);

    return (
        <Dialog open={open} onOpenChange={setOpen} defaultOpen={!product}>
            <DialogContent className="sm:max-w-125 p-6">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription aria-describedby={undefined} />
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="title_en">Title EN</label>

                        <Input id="title_en" {...form.register('body.title_en')} />

                        {errors.body?.title_en?.message && (
                            <span className="text-xs text-red-500">
                                {errors.body.title_en.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title_uz">Title UZ</label>

                        <Input id="title_uz" {...form.register('body.title_uz')} />

                        {errors.body?.title_uz?.message && (
                            <span className="text-xs text-red-500">
                                {errors.body?.title_uz.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title_ru">Title RU</label>

                        <Input id="title_ru" {...form.register('body.title_ru')} />

                        {errors.body?.title_ru?.message && (
                            <span className="text-xs text-red-500">
                                {errors.body?.title_ru.message}
                            </span>
                        )}
                    </div>

                    <div className="flex items-start gap-3">
                        <div>
                            <label htmlFor="type">Type</label>

                            <Select
                                onValueChange={(value) =>
                                    form.setValue('body.type', value as 'CREDIT' | 'CARD')
                                }
                                value={form.watch('body.type')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CREDIT">Credit</SelectItem>
                                    <SelectItem value="CARD">Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label htmlFor="max_amount">Max Amount</label>

                            <Input
                                id="max_amount"
                                type="number"
                                placeholder="Max Amount"
                                {...form.register('body.max_amount', { valueAsNumber: true })}
                            />

                            {errors.body?.max_amount?.message && (
                                <span className="text-xs text-red-500">
                                    {errors.body?.max_amount.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="percent">Percent</label>

                            <Input
                                id="percent"
                                type="number"
                                placeholder="Percent"
                                {...form.register('body.percent', { valueAsNumber: true })}
                            />
                            {errors.body?.percent?.message && (
                                <span className="text-xs text-red-500">
                                    {errors.body?.percent.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button>

                        <Button disabled={isLoading} type="submit">
                            {isLoading ? 'Editing...' : 'Edit'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductForm;
