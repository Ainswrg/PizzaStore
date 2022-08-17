/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://62a2d5c25bd3609cee5b7a72.mockapi.io/items';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { order, sortBy, category, search, currentPage } = params;
  const query = `?_page=${currentPage}&_limit=12&_sort=${sortBy}&_order=${order}${category}${search}`;
  const { data } = await axios.get(`${BASE_URL}${query}`);

  if (!data.length) {
    return thunkApi.rejectWithValue({ message: 'Нет пиццы' });
  }

  return thunkApi.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading', // loading, success, error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
