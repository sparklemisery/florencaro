import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    isAuthenticated: false,
    userInfo: {},
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;

        }

    },

})

export const { login } = authSlice.actions;
export default authSlice.reducer
