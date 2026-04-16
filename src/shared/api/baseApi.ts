import type { RootState } from '@/app/store';
import { logOut, updateAccessToken } from '@/entities/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token?.access;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithAuth: typeof baseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.token?.refresh;

        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh',
                    method: 'POST',
                    body: { refresh_token: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const { access_token } = refreshResult.data as { access_token: string };

                api.dispatch(updateAccessToken(access_token));

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
            }
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['AUTH', 'PRODUCTS', 'WALLETS', 'LIMITS', 'TRANSFERS', 'CARDS', 'USERS'],
    endpoints: () => ({}),
});
