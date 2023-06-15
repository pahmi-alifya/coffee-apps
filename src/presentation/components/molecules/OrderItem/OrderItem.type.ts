import {CartType} from '@models';

interface OrderItemProps {
  cartItemId: number;
  productImage: string;
  title: string;
  normalPrice: number;
  quantity: number;
  cartData: CartType;
  discountedPrice?: number;
  variants?: Array<string>;
  note?: string;
  onDeleteItem: (cartItemId: number) => void;
  onEditItem: (cartItemId: CartType) => void;
  onChangeQty: (cartItemId: number, newQty: number) => void;
}

export default OrderItemProps;
