import type { RootState } from '@/app/store';
import { setCredentials } from '@/entities/auth/authSlice';
import { AuthPaths } from '@/features/auth/path';
import type { AuthData, LoginResponse } from '@/features/auth/type';
import { baseApi } from '@/shared/api/baseApi';
import type { LoginFormValues } from '@/shared/lib/validations/auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: LoginFormValues) => ({
                url: AuthPaths.LOGIN,
                method: 'POST',
                body: data,
            }),
            transformResponse: (data: LoginResponse) => data,
            invalidatesTags: ['AUTH'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        setCredentials({
                            userData: null,
                            token: {
                                access: data.access_token,
                                refresh: data.refresh_token,
                            },
                        })
                    );
                } catch (err) {
                    console.log('LOGIN ERROR', err);
                }
            },
        }),

        refresh: builder.mutation({
            query: ({ refresh_token }: { refresh_token: string }) => ({
                url: AuthPaths.REFRESH,
                method: 'POST',
                body: { refresh_token },
            }),
            invalidatesTags: ['AUTH'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: AuthPaths.LOGOUT,
                method: 'POST',
            }),
            invalidatesTags: ['AUTH'],
        }),

        profile: builder.query({
            query: () => ({
                url: AuthPaths.PROFILE,
                method: 'GET',
            }),
            providesTags: ['AUTH'],
            transformResponse: (data: AuthData) => data,
            async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
                try {
                    const { data } = await queryFulfilled;
                    const state = getState() as RootState;

                    dispatch(
                        setCredentials({
                            userData: data,
                            token: state.auth.token,
                        })
                    );
                } catch (err) {
                    console.log('PROFILE ERROR', err);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation, useProfileQuery } = authApi;
