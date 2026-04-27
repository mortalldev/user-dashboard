import { TransferPaths } from '@/features/transfers/path';
import { baseApi } from '@/shared/api/baseApi';

export const transfersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        transfers: builder.query({
            query: () => ({
                url: TransferPaths.TRANSFERS,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
        }),
    }),
});

export const { useTransfersQuery } = transfersApi;
