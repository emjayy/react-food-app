import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  isSubmitting: false,
  didSubmit: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.totalAmount = state.totalAmount + newItem.price * newItem.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        existingCartItem.amount = existingCartItem.amount + newItem.amount;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          amount: newItem.amount,
          price: newItem.price,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.items[existingCartItemIndex];
      state.totalAmount = state.totalAmount - existingItem.price;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    toggleIsSubmitting(state) {
      state.isSubmitting = !state.isSubmitting;
    },
    toggleDidSubmit(state) {
      state.didSubmit = !state.didSubmit;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
