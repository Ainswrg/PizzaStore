enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sort: Sort;
  searchValue: string;
}

export { SortPropertyEnum };
export type { Sort, FilterSliceState };
