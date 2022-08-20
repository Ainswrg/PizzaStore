// import { TCartItem } from '../redux/slices/cartSlice';

import { TCartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
