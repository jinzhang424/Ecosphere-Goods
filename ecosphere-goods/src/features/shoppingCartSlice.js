import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },

    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.product.id !== action.payload.id);
        }
    }
})

export const { addItem, removeItem } = shoppingCartSlice.actions
export const selectCart = (state) => state.cart.items
export default shoppingCartSlice.reducer