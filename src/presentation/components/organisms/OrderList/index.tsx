import {Column, Row, Text, RectButton, Theme} from '@atoms';
import OrderItem from '@molecules/OrderItem';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import OrderListProps from './OrderList.type';

const OrderList: React.FC<OrderListProps> = ({
  items,
  onEditItem,
  onEditItemQty,
  onDeleteItem,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const handleMenuButtonPress = () => {
    navigation.navigate('Home');
  };

  if (!items) {
    return null;
  }

  return (
    <Column padding={{v: 16, h: 24}} contentStyle="fitContent">
      <Row arrangement="between" alignment="start" margin={{b: 24}}>
        <Text type="b1" weight="medium">
          {t('orderDetail.orderList.title')}
        </Text>
        <RectButton
          borderWidth={1}
          borderRadius={32}
          padding={{v: 8, h: 12}}
          onPress={handleMenuButtonPress}>
          <Text type="l2" color={Theme.Red206}>{`+ `}</Text>
          <Text type="l2">{t('orderDetail.orderList.addMenu')}</Text>
        </RectButton>
      </Row>
      {items.map((item) => {
        const variants = item.variant.map(
          (value) => value.product_variant[0].variant_name,
        );
        const modifier = item.modifier.reduce((prev, curr) => {
          const modifierNames = curr.product_modifier.map(
            (mod) => mod.modifier_name,
          );
          return prev.concat(modifierNames);
        }, [] as string[]);
        return (
          <OrderItem
            key={item.id_cart_item}
            cartItemId={item.id_cart_item}
            productImage={item.product_photo}
            title={item.product_name}
            cartData={item}
            variants={variants.concat(item.variant_non_sku).concat(modifier)}
            normalPrice={item.subtotal}
            discountedPrice={item.discounted_price}
            note={item.notes}
            quantity={item.qty}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
            onChangeQty={onEditItemQty}
          />
        );
      })}
    </Column>
  );
};

export default OrderList;
