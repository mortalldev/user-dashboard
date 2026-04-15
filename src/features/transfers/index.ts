import { baseApi } from '@/shared/api/baseApi';

export const transfersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        transfers: builder.query({
            query: () => ({
                url: '/transfers',
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
        }),
    }),
});

export const { useTransfersQuery } = transfersApi;
