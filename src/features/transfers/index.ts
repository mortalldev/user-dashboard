import { TransferPaths } from '@/features/transfers/path';
import type {
    EcommTransfersData,
    P2pReceiversData,
    P2pSettingsData,
    TransfersData,
} from '@/features/transfers/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

export const transfersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTranfers: builder.query({
            query: () => ({
                url: TransferPaths.TRANSFERS,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
            transformResponse: (data: ApiResponse<TransfersData[]>) => data,
        }),

        getTranferById: builder.query({
            query: (tranferId: number) => ({
                url: `${TransferPaths.TRANSFERS}/${tranferId}`,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
            transformResponse: (data: TransfersData) => data,
        }),

        getEcommTranfers: builder.query({
            query: () => ({
                url: TransferPaths.ECOMM_TRANFERS,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
            transformResponse: (data: ApiResponse<EcommTransfersData[]>) => data,
        }),

        getP2pReceivers: builder.query({
            query: () => ({
                url: TransferPaths.ECOMM_TRANFERS,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
            transformResponse: (data: ApiResponse<P2pReceiversData[]>) => data,
        }),

        getP2pSetttings: builder.query({
            query: () => ({
                url: TransferPaths.ECOMM_TRANFERS,
                method: 'GET',
            }),
            providesTags: ['TRANSFERS'],
            transformResponse: (data: ApiResponse<P2pSettingsData[]>) => data,
        }),
    }),
});

export const {
    useGetTranfersQuery,
    useGetTranferByIdQuery,
    useGetEcommTranfersQuery,
    useGetP2pReceiversQuery,
    useGetP2pSetttingsQuery,
} = transfersApi;
