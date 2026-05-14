import { KycPaths } from '@/features/kyc/path';
import type { KycData } from '@/features/kyc/type';
import { baseApi } from '@/shared/api/baseApi';
import type { EditKycVerificationStatus } from '@/shared/lib/validations/kyc';
import type { ApiResponse } from '@/shared/types';

export const kycApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getKycVerifications: builder.query({
            query: () => ({
                url: KycPaths.VERIFICATIONS,
                method: 'GET',
            }),
            providesTags: ['KYC'],
            transformResponse: (data: ApiResponse<KycData[]>) => data,
        }),

        editGlobalLimit: builder.mutation({
            query: (data: EditKycVerificationStatus) => ({
                url: `${KycPaths.VERIFICATIONS}/${data.kycId}/status`,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['KYC'],
        }),
    }),
});

export const { useGetKycVerificationsQuery, useEditGlobalLimitMutation } = kycApi;
