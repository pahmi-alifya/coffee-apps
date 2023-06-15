import {JiwaIconName} from '@atoms/Icon/Icon.types';

interface OrderDetailTab {
  title: string;
  icon: JiwaIconName;
  type: TabType;
}

export enum TabType {
  Pickup = 'PICKUP',
  Delivery = 'DELIVERY',
}

export const ORDER_DETAIL_TABS: Array<OrderDetailTab> = [
  {
    title: 'Pick Up',
    icon: 'Pick-Up',
    type: TabType.Pickup,
  },
  {
    title: 'Delivery',
    icon: 'Delivery',
    type: TabType.Delivery,
  },
];
