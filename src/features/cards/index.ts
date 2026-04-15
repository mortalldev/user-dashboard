import { baseApi } from '@/shared/api/baseApi';
import type { CardData } from './type';
import type { ApiResponse } from '@/shared/types';

export const cardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cards: builder.query({
            query: () => ({
                url: '/cards',
                method: 'GET',
            }),
            providesTags: ['CARDS'],
            transformResponse: (data: ApiResponse<CardData>) => data,
        }),
    }),
});

export const { useCardsQuery } = cardsApi;
