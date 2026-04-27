import { ProductPaths } from '@/features/products/path';
import type { ProductData } from '@/features/products/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: () => ({
                url: ProductPaths.PRODUCTS,
                method: 'GET',
            }),
            providesTags: ['PRODUCTS'],
            transformResponse: (data: ApiResponse<ProductData[]>) => data,
        }),

        createProduct: builder.mutation({
            query: (data) => ({
                url: ProductPaths.PRODUCTS,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['PRODUCTS'],
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${ProductPaths.PRODUCTS}/${data}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['PRODUCTS'],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${ProductPaths.PRODUCTS}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PRODUCTS'],
        }),

        cardProducts: builder.query({
            query: () => ({
                url: ProductPaths.CARD_PRODUCTS,
                method: 'GET',
            }),
            providesTags: ['PRODUCTS'],
        }),
    }),
});

export const {
    useProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCardProductsQuery,
} = productsApi;
