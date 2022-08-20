import { RootState } from '../store';

const selectCart = (state: RootState) => state.cart;
const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((item) => item.id === id);

export { selectCart, selectCartItemById };
