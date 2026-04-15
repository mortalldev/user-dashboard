import type { AuthData } from '@/features/auth/type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    userData?: AuthData | null;
    token: string;
}

const initialState: AuthState = {
    userData: JSON.parse(localStorage.getItem('user')!) || null,
    token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;

            localStorage.setItem('token', action.payload.token);

            if (action.payload.userData) {
                localStorage.setItem('user', JSON.stringify(action.payload.userData));
            }
        },

        logOut: (state) => {
            state.token = '';
            state.userData = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
