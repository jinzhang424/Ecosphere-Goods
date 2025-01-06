import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },

    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
        },

        removeItem: (state) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    }
})

export const { addItem, removeItem } = userSlice.actions
export const selectUser = (state) => state.cart.items
export default shoppingCartSlice.reducer