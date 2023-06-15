import {OutletType} from '@models';

interface PickupOrderAddressSummaryProps {
  activePickupTime: string;
  onClickActivePickup: (newPickupTime: string) => void;
  pickupTimeSelections?: Array<string>;
  outlet?: OutletType;
}

export default PickupOrderAddressSummaryProps;
