import { UsersPaths } from '@/features/users/path';
import type { UsersData } from '@/features/users/type';
import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types';

type UsersParams = {
    page?: number;
    search?: string;
    status?: string;
    level?: string;
};

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query<ApiResponse<UsersData>, UsersParams | void>({
            query: (params) => ({
                url: UsersPaths.USERS,
                method: 'GET',
                params: {
                    page: params?.page ?? 1,
                    ...(params?.search && { phone: params.search }),
                    ...(params?.status && { status: params.status }),
                    ...(params?.level && { level: params.level }),
                },
            }),
            providesTags: ['USERS'],
            transformResponse: (data: ApiResponse<UsersData>) => data,
        }),

        usersById: builder.query<UsersData, number>({
            query: (userId) => ({
                url: `${UsersPaths.USERS}/${userId}`,
                method: 'GET',
            }),
            providesTags: ['USERS'],
            transformResponse: (data: UsersData) => data,
        }),
    }),
});

export const { useUsersQuery, useUsersByIdQuery } = usersApi;
