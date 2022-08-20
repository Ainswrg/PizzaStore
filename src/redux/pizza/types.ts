interface IPizza {
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

interface IPizzaSlice {
  items: IPizza[];
  status: Status;
}

type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};
const enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export { Status };
export type { IPizza, SearchPizzaParams, IPizzaSlice };
