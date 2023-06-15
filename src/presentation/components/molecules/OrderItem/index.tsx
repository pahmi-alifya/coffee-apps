import {Column, Icon, IconButton, Row, Spacing, Text, Theme} from '@atoms';
import {currency} from '@utils';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './OrderItem.style';
import OrderItemProps from './OrderItem.type';

const OrderItem: React.FC<OrderItemProps> = ({
  cartItemId,
  productImage,
  title,
  normalPrice,
  quantity,
  discountedPrice,
  cartData,
  variants = [],
  note = '',
  onEditItem,
  onDeleteItem,
  onChangeQty,
}) => {
  const {t} = useTranslation();
  const isDiscounted = !!discountedPrice;

  const handleDeleteItem = useCallback(() => {
    onDeleteItem(cartItemId);
  }, [cartItemId, onDeleteItem]);

  const handleEditItem = useCallback(() => {
    onEditItem(cartData);
  }, [cartData, onEditItem]);

  const handleChangeQty = useCallback(
    (newQty: number) => {
      onChangeQty(cartItemId, newQty);
    },
    [cartItemId, onChangeQty],
  );

  return (
    <Row alignment="start" padding={{v: Spacing.Standard}}>
      <FastImage
        source={{
          uri: productImage,
        }}
        style={styles.productImage}
      />
      <Column margin={{l: Spacing.Small}}>
        <Row alignment="start">
          <Column>
            <Text type="l1">{title}</Text>
            {variants?.length > 0 &&
              variants.map((variant, index) => (
                <Text
                  type="l2"
                  color={Theme.Neutral05}
                  key={`${cartItemId}-${variant}-${index}`}>
                  {variant}
                </Text>
              ))}
          </Column>
          <Column alignment="end" width="30%" contentStyle="fixed">
            {isDiscounted && (
              <Text type="l1" weight="medium">
                {currency(discountedPrice)}
              </Text>
            )}
            <Text
              type={isDiscounted ? 'l2' : 'l1'}
              color={isDiscounted ? Theme.Neutral05 : Theme.Neutral10}
              textDecorationLine={isDiscounted ? 'line-through' : undefined}>
              {currency(normalPrice)}
            </Text>
          </Column>
        </Row>
        {note?.length > 0 && (
          <Column
            padding={Spacing.Tiny}
            backgroundColor={Theme.Neutral02}
            borderRadius={8}
            margin={{t: Spacing.Tiny}}>
            <Text
              type="l2"
              color={Theme.Neutral05}
              margin={{b: Spacing.SuperTiny}}>
              {t('orderDetail.orderItemNote')}
            </Text>
            <Row>
              <Icon name="Notes" size={12} color={Theme.Neutral05} />
              <Text
                type="l2"
                color={Theme.Neutral05}
                margin={{l: Spacing.Small}}>
                {note}
              </Text>
            </Row>
          </Column>
        )}
        <Row margin={{t: Spacing.Small}}>
          <IconButton
            iconProps={{
              name: 'Edit',
              size: 15,
              color: Theme.Red206,
            }}
            onPress={handleEditItem}
          />
          <View style={styles.editProductSeparator} />
          <IconButton
            size={16}
            iconProps={{
              name: 'Trash',
              size: 16,
              color: Theme.Red206,
            }}
            style={styles.deleteLogo}
            onPress={handleDeleteItem}
          />
          <IconButton
            iconProps={{
              name: 'Minus',
              size: 20,
            }}
            style={styles.minusLogo}
            onPress={() => handleChangeQty(quantity - 1)}
          />
          <Text
            type="l1"
            weight="bold"
            style={styles.quantityText}
            align="center">
            {quantity}
          </Text>
          <IconButton
            iconProps={{
              name: 'Plus',
              size: 20,
            }}
            style={styles.plusLogo}
            onPress={() => handleChangeQty(quantity + 1)}
          />
        </Row>
      </Column>
    </Row>
  );
};

export default OrderItem;
