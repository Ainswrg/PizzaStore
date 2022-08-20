export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  quantity: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}
