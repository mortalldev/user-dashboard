import {
    Dialog,
    DialogContent,
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

interface CreateProductFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProductForm = ({ open, setOpen }: CreateProductFormProps) => {
    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title_en: '',
            title_uz: '',
            title_ru: '',
            type: 'CREDIT',
            max_amount: 0,
            percent: '',
        },
    });

    const onSubmit = (data: CreateProductFormValues) => {
        console.log(data);

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
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Input placeholder="Title EN" {...form.register('title_en')} />

                    <Input placeholder="Title UZ" {...form.register('title_uz')} />

                    <Input placeholder="Title RU" {...form.register('title_ru')} />

                    <Select
                        onValueChange={(value) => form.setValue('type', value as 'CREDIT' | 'CARD')}
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

                    <Input
                        type="number"
                        placeholder="Max amount"
                        {...form.register('max_amount', { valueAsNumber: true })}
                    />

                    <Input placeholder="Percent" {...form.register('percent')} />

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProductForm;
