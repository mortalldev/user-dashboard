import z from 'zod';

export const createProductSchema = z.object({
    title_en: z.string().min(1, 'Required'),
    title_uz: z.string().min(1, 'Required'),
    title_ru: z.string().min(1, 'Required'),
    type: z.enum(['CREDIT', 'CARD'] as const),
    max_amount: z.number().min(0),
    percent: z.string().min(1),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
