import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

import { Plus } from 'lucide-react';
import {
    createProductSchema,
    type CreateProductFormValues,
} from '@/shared/lib/validations/product';
import { useCreateProductMutation } from '@/features/products';
import { toast } from 'sonner';

interface CreateProductFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProductForm = ({ open, setOpen }: CreateProductFormProps) => {
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title_en: '',
            title_uz: '',
            title_ru: '',
            type: 'CREDIT',
            max_amount: undefined,
            percent: undefined,
        },
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = async (data: CreateProductFormValues) => {
        const bodyData = {
            ...data,
            percent: data.percent.toFixed(2),
        };

        try {
            const res = await createProduct(bodyData as any).unwrap();

            if (res) {
                toast.success('Product created');
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-5 py-5 rounded-xl flex items-center gap-2 hover:bg-primary/80">
                    <Plus size={16} />
                    Create product
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-125 p-6">
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription aria-describedby={undefined} />
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="title_en">Title EN</label>

                        <Input id="title_en" {...form.register('title_en')} />

                        {errors.title_en?.message && (
                            <span className="text-xs text-red-500">{errors.title_en.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title_uz">Title UZ</label>

                        <Input id="title_uz" {...form.register('title_uz')} />

                        {errors.title_uz?.message && (
                            <span className="text-xs text-red-500">{errors.title_uz.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title_ru">Title RU</label>

                        <Input id="title_ru" {...form.register('title_ru')} />

                        {errors.title_ru?.message && (
                            <span className="text-xs text-red-500">{errors.title_ru.message}</span>
                        )}
                    </div>

                    <div className="flex items-start gap-3">
                        <div>
                            <label htmlFor="type">Type</label>

                            <Select
                                onValueChange={(value) =>
                                    form.setValue('type', value as 'CREDIT' | 'CARD')
                                }
                                defaultValue="CREDIT"
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
                                {...form.register('max_amount', { valueAsNumber: true })}
                            />

                            {errors.max_amount?.message && (
                                <span className="text-xs text-red-500">
                                    {errors.max_amount.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="percent">Percent</label>

                            <Input
                                id="percent"
                                type="number"
                                placeholder="Percent"
                                {...form.register('percent', { valueAsNumber: true })}
                            />
                            {errors.percent?.message && (
                                <span className="text-xs text-red-500">
                                    {errors.percent.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button>

                        <Button disabled={isLoading} type="submit">
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProductForm;
