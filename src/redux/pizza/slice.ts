/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizza, IPizzaSlice, SearchPizzaParams, Status } from './types';

const BASE_URL = 'https://62a2d5c25bd3609cee5b7a72.mockapi.io/items';

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const query = `?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
  const { data } = await axios.get<IPizza[]>(`${BASE_URL}${query}`);
  return data;
});

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING,
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
    [fetchPizzas.pending.type]: (state: IPizzaSlice) => {
      state.status = Status.LOADING;
      state.items = [];
    },
    [fetchPizzas.fulfilled.type]: (state: IPizzaSlice, action: PayloadAction<IPizza[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchPizzas.rejected.type]: (state: IPizzaSlice) => {
      state.status = Status.ERROR;
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
