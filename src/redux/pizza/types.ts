export interface IPizza {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  imageUrl: string;
  category: number;
  rating: number;
  quantity: number;
}

export interface IPizzaSlice {
  items: IPizza[];
  status: Status;
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};
export const enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
