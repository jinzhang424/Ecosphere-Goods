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
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } 
        }
    }
})

export const { addItem, removeItem } = shoppingCartSlice.actions
export const selectCart = (state) => state.cart.items
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + item.product.prices[0].priceData.unit_amount * item.quantity, 0)
export default shoppingCartSlice.reducer