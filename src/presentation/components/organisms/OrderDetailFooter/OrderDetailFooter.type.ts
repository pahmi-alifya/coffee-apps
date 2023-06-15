import {PaymentMethod} from 'src/presentation/pages/Order/OrderDetail/OrderDetail.type';

interface OrderDetailFooterProps {
  showXpBanner?: boolean;
  activePaymentMethod?: PaymentMethod;
  totalPrice: number;
  onChoosePayment: () => void;
  onSubmitTransaction: () => void;
}

export default OrderDetailFooterProps;
