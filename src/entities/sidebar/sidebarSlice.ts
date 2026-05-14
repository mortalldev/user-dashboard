import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpen: JSON.parse(localStorage.getItem('sidebar')!) ?? false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebarMenu: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
            localStorage.setItem('sidebar', JSON.stringify(state.sidebarOpen));
        },
    },
});

export const { toggleSidebarMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
