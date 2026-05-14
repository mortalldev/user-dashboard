import { LimitsPaths } from '@/features/limits/path';
import type { GlobalLimitsData, UsersLimitsData } from '@/features/limits/type';
import { baseApi } from '@/shared/api/baseApi';
import type {
    CreateGlobalLimitSchema,
    CreateUsersLimitSchema,
    EditGlobalLimitSchema,
    EditUsersLimitSchema,
} from '@/shared/lib/validations/limits';
import type { ApiResponse } from '@/shared/types';

export const limitsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGlobalLimits: builder.query({
            query: () => ({
                url: LimitsPaths.LIMITS,
                method: 'GET',
            }),
            providesTags: ['LIMITS'],
            transformResponse: (data: ApiResponse<GlobalLimitsData[]>) => data,
        }),

        createGlobalLimit: builder.mutation({
            query: (data: CreateGlobalLimitSchema) => ({
                url: `${LimitsPaths.LIMITS}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['LIMITS'],
        }),

        editGlobalLimit: builder.mutation({
            query: (data: EditGlobalLimitSchema) => ({
                url: `${LimitsPaths.LIMITS}/${data.globalLimitId}`,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['LIMITS'],
        }),

        getUsersLimits: builder.query({
            query: () => ({
                url: LimitsPaths.USERS,
                method: 'GET',
            }),
            providesTags: ['LIMITS'],
            transformResponse: (data: ApiResponse<UsersLimitsData[]>) => data,
        }),

        createUsersLimit: builder.mutation({
            query: (data: CreateUsersLimitSchema) => ({
                url: `${LimitsPaths.USERS}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['LIMITS'],
        }),

        editUsersLimit: builder.mutation({
            query: (data: EditUsersLimitSchema) => ({
                url: `${LimitsPaths.LIMITS}/${data.usersLimitId}`,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['LIMITS'],
        }),
    }),
});

export const {
    useGetGlobalLimitsQuery,
    useCreateGlobalLimitMutation,
    useEditGlobalLimitMutation,
    useGetUsersLimitsQuery,
    useCreateUsersLimitMutation,
    useEditUsersLimitMutation,
} = limitsApi;
