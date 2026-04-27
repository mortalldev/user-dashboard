import { UsersPaths } from '@/features/users/path';
import type { UsersData } from '@/features/users/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query({
            query: () => ({
                url: UsersPaths.USERS,
                method: 'GET',
            }),
            providesTags: ['USERS'],
            transformResponse: (data: ApiResponse<UsersData>) => data,
        }),
    }),
});

export const { useUsersQuery } = usersApi;
