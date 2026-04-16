import type { AuthData } from '@/features/auth/type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
    access: string;
    refresh: string;
}

interface AuthState {
    userData?: AuthData | null;
    token?: TokenState | null;
}

const getStoredToken = (): TokenState | null => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (access && refresh) return { access, refresh };

    return null;
};

const initialState: AuthState = {
    userData: JSON.parse(localStorage.getItem('user')!) || null,
    token: getStoredToken(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;

            if (action.payload.token?.access) {
                localStorage.setItem('access_token', action.payload.token.access);
            }

            if (action.payload.token?.refresh) {
                localStorage.setItem('refresh_token', action.payload.token.refresh);
            }

            if (action.payload.userData) {
                localStorage.setItem('user', JSON.stringify(action.payload.userData));
            }
        },

        updateAccessToken: (state, action: PayloadAction<string>) => {
            if (state.token) {
                state.token.access = action.payload;
            } else {
                state.token = { access: action.payload, refresh: '' };
            }

            localStorage.setItem('access_token', action.payload);
        },

        logOut: (state) => {
            state.token = null;
            state.userData = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, updateAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;
