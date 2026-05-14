import z from 'zod';

export const createProductSchema = z.object({
    title_en: z.string().min(1, 'Required'),
    title_uz: z.string().min(1, 'Required'),
    title_ru: z.string().min(1, 'Required'),
    type: z.enum(['CREDIT', 'CARD'] as const),
    max_amount: z.number({ error: 'Required' }).min(1, 'Required'),
    percent: z
        .number({ error: 'Required Min ( 1 )' })
        .min(1, 'Required Min ( 1 )')
        .max(100, 'Max ( 100 )'),
});

export const editProductSchema = z.object({
    body: createProductSchema,
    productId: z.number().min(1, 'Required'),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type EditProductFormValues = z.infer<typeof editProductSchema>;
