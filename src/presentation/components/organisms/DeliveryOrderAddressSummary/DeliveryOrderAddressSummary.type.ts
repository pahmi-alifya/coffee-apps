import {OutletType} from '@models';
import {DeliveryEstimationType} from '@models';

interface DeliveryOrderAddressSummaryProps {
  outlet?: OutletType;
  address?: string;
  addressNotes?: string;
  activeCourier?: DeliveryEstimationType;
  deliveryCourierSelections?: Array<DeliveryEstimationType>;
  onPressChangeAddress: () => void;
  onPressChangeAddressNotes: () => void;
  onPressChangeCourier: (newCourier: DeliveryEstimationType) => void;
}

export default DeliveryOrderAddressSummaryProps;
