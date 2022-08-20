/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TCartItem } from '@/src/@types/type';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  quantity: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (!findItem) throw new Error('Такого элемента нет в корзине');
      if (findItem.quantity > 1) {
        findItem.quantity -= 1;
        state.totalPrice = state.items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
      }
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
