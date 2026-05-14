import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/entities/auth/authSlice';
import sidebarSlice from '@/entities/sidebar/sidebarSlice';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authSlice,
        sidebar: sidebarSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
