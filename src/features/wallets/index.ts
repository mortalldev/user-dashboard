import { WalletsPaths } from '@/features/wallets/path';
import type { WalletsData } from '@/features/wallets/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

export const walletsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        wallets: builder.query({
            query: () => ({
                url: WalletsPaths.WALLETS,
                method: 'GET',
            }),
            providesTags: ['WALLETS'],
            transformResponse: (data: ApiResponse<WalletsData>) => data,
        }),
    }),
});

export const { useWalletsQuery } = walletsApi;
