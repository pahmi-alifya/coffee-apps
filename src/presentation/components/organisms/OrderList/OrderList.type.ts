import {CartType} from '@models';

interface OrderListProps {
  items?: Array<CartType>;
  onEditItem: (cartItemId: CartType) => void;
  onEditItemQty: (cartItemId: number, newQty: number) => void;
  onDeleteItem: (cartItemId: number) => void;
}

export default OrderListProps;
