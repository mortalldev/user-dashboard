import z from 'zod';

export const createGlobalLimitSchema = z.object({
    period: z.string().min(1, 'Required'),
    type: z.enum(['p2p', 'b2b']),
    subtype: z.string(),
    currency: z.enum(['UZS', 'USD']),
    amount: z.number({ error: 'Required' }).min(1, 'Required'),
    op_number: z.number().min(1, 'Required'),
    debitor_type: z.enum(['card', 'credit', 'uzcard', 'visa']),
    creditor_type: z.enum(['card', 'credit', 'uzcard', 'visa']),
    limit_order: z.number().min(1, 'Required'),
    limit_type: z.string().min(1, 'Required'),
});

export const editGlobalLimitSchema = z.object({
    body: createGlobalLimitSchema,
    globalLimitId: z.number().min(1, 'Required'),
});

export const createUsersLimitSchema = z.object({
    period: z.string().min(1, 'Required'),
    type: z.enum(['p2p', 'b2b']),
    subtype: z.string(),
    currency: z.enum(['UZS', 'USD']),
    amount: z.number({ error: 'Required' }).min(1, 'Required'),
    op_number: z.number().min(1, 'Required'),
    debitor_type: z.enum(['card', 'credit', 'uzcard', 'visa']),
    creditor_type: z.enum(['card', 'credit', 'uzcard', 'visa']),
    user_id: 1,
});

export const editUsersLimitSchema = z.object({
    body: createUsersLimitSchema,
    usersLimitId: z.number().min(1, 'Required'),
});

export type CreateGlobalLimitSchema = z.infer<typeof createGlobalLimitSchema>;
export type EditGlobalLimitSchema = z.infer<typeof editGlobalLimitSchema>;

export type CreateUsersLimitSchema = z.infer<typeof createUsersLimitSchema>;
export type EditUsersLimitSchema = z.infer<typeof editUsersLimitSchema>;
