import {TabType} from './OrderDetail.constant';

export interface PaymentMethod {
  id_payment: number;
  payment_vendor: string;
  jiwa_point: boolean;
  payment_name: string;
  logo: string;
}

interface ProductTransaction {
  id_product: number;
  id_brand: number;
  transaction_product: string;
  qty: number;
}
export interface PostTransactionBody {
  transaction: {
    id_outlet: number;
    id_promocode: string[];
  };
  product_transaction: Array<ProductTransaction>;
  transaction_payment: {
    id_payment: number;
    payment_vendor: string;
    jiwa_point: boolean;
  };
  delivery: {
    delivery_type: TabType;
    // Delivery only
    delivery_notes?: string;
    courier?: string;
    delivery_data?: {
      recepients: {
        lat: number;
        long: number;
        address: string;
        name: string;
        phone: string;
      };
      id_outlet: number;
      items: string[];
    };
    // Pickup only
    pick_up_time?: string;
  };
}

export interface PostTransactionResponse {
  statusCode: number;
  data: {
    id_transaction: number;
    successful_callback_url: string;
    url?: string;
    failed_success_url: string;
  };
}
