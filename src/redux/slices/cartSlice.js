/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.quantity > 1) {
        findItem.quantity -= 1;
        state.totalPrice = state.items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
      }
    },
    removeItem: (state, action) => {
      if (window.confirm('Ты действительно хочешь удалить этот предмет?')) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalPrice = state.items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
