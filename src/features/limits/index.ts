import { baseApi } from '@/shared/api/baseApi';
import type { LimitsData } from './type';
import type { ApiResponse } from '@/shared/types';

export const limitsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        limits: builder.query({
            query: () => ({
                url: '/limits/global',
                method: 'GET',
            }),
            providesTags: ['LIMITS'],
            transformResponse: (data: ApiResponse<LimitsData>) => data,
        }),
    }),
});

export const { useLimitsQuery } = limitsApi;
