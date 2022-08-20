type TCartItem = {
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

export type { TCartItem, ICartSliceState };
