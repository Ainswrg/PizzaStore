/* eslint-disable no-param-reassign */
import { createSlice, Slice } from '@reduxjs/toolkit';

export interface IState {
  categoryId: number;
  currentPage: number;
  sort: {
    name: string;
    sortProperty: string;
  };
  searchValue: string;
}

const initialState: IState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  searchValue: '',
};

const filterSlice: Slice<IState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.searchValue = action.payload.searchValue;
    },
  },
});

// export const selectSort = (state: SliceCaseReducers<IState | string>) => state.filter.sort;
export const selectFilter = (state: any) => state.filter;

export const { setCategoryId, setSortType, setSearchValue, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
