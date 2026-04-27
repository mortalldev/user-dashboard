import { LimitsPaths } from '@/features/limits/path';
import type { LimitsData } from '@/features/limits/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

export const limitsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        limits: builder.query({
            query: () => ({
                url: LimitsPaths.LIMITS,
                method: 'GET',
            }),
            providesTags: ['LIMITS'],
            transformResponse: (data: ApiResponse<LimitsData>) => data,
        }),
    }),
});

export const { useLimitsQuery } = limitsApi;
