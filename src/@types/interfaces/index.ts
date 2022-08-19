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

export type { IPizza };
