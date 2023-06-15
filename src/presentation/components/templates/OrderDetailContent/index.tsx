import React from 'react';
import {Separator, Theme} from '@atoms';
import {Tabs} from 'react-native-collapsible-tab-view';
import OrderDetailContentProps from './OrderDetailContent.type';
import DeliveryOrderAddressSummary from '@organisms/DeliveryOrderAddressSummary';
import PickupOrderAddressSummary from '@organisms/PickupOrderAddressSummary';
import OrderList from '@organisms/OrderList';
import OrderPaymentSummary from '@organisms/OrderPaymentSummary';
import OrderPromoButton from '@organisms/OrderPromoButton';
import {TabType} from 'src/presentation/pages/Order/OrderDetail/OrderDetail.constant';

const OrderDetailContent: React.FC<OrderDetailContentProps> = ({
  type,
  items,
  outlet,
  activePickupTime = '',
  onPressSelectPickupTime = () => {},
  pickupTimeSelections = [],
  address = '',
  addressNotes = '',
  activeCourier = undefined,
  deliveryCourierSelections = [],
  onPressChangeAddress = () => {},
  onPressChangeAddressNotes = () => {},
  onPressChangeCourier = () => {},
  onEditItem = () => {},
  onEditItemQty = () => {},
  onDeleteItem = () => {},
  estimationData,
  onPromoButtonPress = () => {},
}) => {
  return (
    <Tabs.ScrollView
      scrollEnabled
      contentContainerStyle={{marginTop: 16, paddingBottom: 16}}>
      <Separator height={4} backgroundColor={Theme.Neutral02} />
      {type === TabType.Delivery ? (
        <DeliveryOrderAddressSummary
          outlet={outlet}
          address={address}
          addressNotes={addressNotes}
          activeCourier={activeCourier}
          deliveryCourierSelections={deliveryCourierSelections}
          onPressChangeAddress={onPressChangeAddress}
          onPressChangeAddressNotes={onPressChangeAddressNotes}
          onPressChangeCourier={onPressChangeCourier}
        />
      ) : (
        <PickupOrderAddressSummary
          outlet={outlet}
          activePickupTime={activePickupTime}
          onClickActivePickup={onPressSelectPickupTime}
          pickupTimeSelections={pickupTimeSelections}
        />
      )}
      <Separator height={4} backgroundColor={Theme.Neutral02} />
      <OrderList
        items={items}
        onEditItem={onEditItem}
        onEditItemQty={onEditItemQty}
        onDeleteItem={onDeleteItem}
      />
      <Separator height={4} backgroundColor={Theme.Neutral02} />
      <OrderPaymentSummary summary={estimationData} />
      <Separator height={4} backgroundColor={Theme.Neutral02} />
      <OrderPromoButton
        onPress={onPromoButtonPress}
        isPromoApplied={Boolean(estimationData?.is_promo_applied)}
      />
    </Tabs.ScrollView>
  );
};

export default OrderDetailContent;
