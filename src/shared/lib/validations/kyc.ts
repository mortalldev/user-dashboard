import { z } from 'zod';

export const editKycVerificationStatus = z.object({
    body: z.object({
        status: z.number().min(1, 'Required'),
        additional: z.string().min(1, 'Required'),
    }),
    kycId: z.number().min(1, 'Required'),
});

export type EditKycVerificationStatus = z.infer<typeof editKycVerificationStatus>;
