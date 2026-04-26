import { baseApi } from '@/shared/api/baseApi';
import type { CardData, CardFamilyData } from './type';
import type { ApiResponse } from '@/shared/types';

export const cardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cards: builder.query<
            ApiResponse<CardData[]>,
            { page?: number; perPage?: number } | undefined
        >({
            query: (params) => ({
                url: '/cards',
                method: 'GET',
                params: {
                    page: params?.page ?? 1,
                    per_page: params?.perPage ?? 10,
                },
            }),
            providesTags: ['CARDS'],
            transformResponse: (data: ApiResponse<CardData[]>) => data,
        }),

        cardById: builder.query<CardData, number>({
            query: (id) => ({
                url: `/cards/${id}`,
                method: 'GET',
            }),
            providesTags: ['CARDS'],
        }),

        familyCards: builder.query({
            query: () => ({
                url: '/family-cards',
                method: 'GET',
            }),
            transformResponse: (data: ApiResponse<CardFamilyData[]>) => data,
            providesTags: ['CARDS'],
        }),
    }),
});

export const { useCardsQuery, useCardByIdQuery, useFamilyCardsQuery } = cardsApi;
