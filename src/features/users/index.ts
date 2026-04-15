import { baseApi } from '@/shared/api/baseApi';
import type { UsersData } from './type';
import type { ApiResponse } from '@/shared/types';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['USERS'],
            transformResponse: (data: ApiResponse<UsersData>) => data,
        }),
    }),
});

export const { useUsersQuery } = usersApi;
