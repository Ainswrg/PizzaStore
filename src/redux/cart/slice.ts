/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { ICartSliceState, TCartItem } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (!findItem) throw new Error('Такого элемента нет в корзине');
      findItem.quantity -= 1;
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
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
