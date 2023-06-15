import {CartType, OutletType, TransactionEstimationType} from '@models';
import {DeliveryEstimationType} from '@models';
import {TabType} from 'src/presentation/pages/Order/OrderDetail/OrderDetail.constant';

interface OrderDetailContentProps {
  type: TabType;
  outlet?: OutletType;
  /* Start of pickup order related props */
  activePickupTime?: string;
  pickupTimeSelections?: Array<string>;
  onPressSelectPickupTime?: (newPickupTime: string) => void;
  /* End of pickup order related props */

  /* Start of delivery order related props */
  address?: string;
  addressNotes?: string;
  activeCourier?: DeliveryEstimationType;
  deliveryCourierSelections?: Array<DeliveryEstimationType>;
  onPressChangeAddress?: () => void;
  onPressChangeAddressNotes?: () => void;
  onPressChangeCourier?: (newActiveCourier: DeliveryEstimationType) => void;
  /* End of delivery order related props */

  /* Start of edit order item props */
  items?: Array<CartType>;
  onEditItem?: (cartItemId: CartType) => void;
  onEditItemQty?: (cartItemId: number, newQty: number) => void;
  onDeleteItem?: (cartItemId: number) => void;
  /* Start of edit order item props */

  estimationData?: TransactionEstimationType;
  onPromoButtonPress?: () => void;
}

export default OrderDetailContentProps;
