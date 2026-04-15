import type { RootState } from '@/app/store';
import { logOut } from '@/entities/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithAuth: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(logOut());

        localStorage.clear();

        window.location.href = '/login';
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,

    tagTypes: ['AUTH', 'PRODUCTS', 'WALLETS', 'LIMITS', 'TRANSFERS', 'CARDS', 'USERS'],

    endpoints: () => ({}),
});
