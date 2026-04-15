import { baseApi } from '@/shared/api/baseApi';
import type { ProductData } from './type';
import type { ApiResponse } from '@/shared/types';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: () => ({
                url: '/loan-products',
                method: 'GET',
            }),
            providesTags: ['PRODUCTS'],
            transformResponse: (data: ApiResponse<ProductData[]>) => data,
        }),
    }),
});

export const { useProductsQuery } = productsApi;
