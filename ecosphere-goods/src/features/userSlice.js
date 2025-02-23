import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: 0,
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
            signOut(auth).catch((error) => console.error("Error signing out:", error))
        }
    }
})

export const { login, logout } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer