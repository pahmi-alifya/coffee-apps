import {SvgVoucher} from '@assets';
import {Column, Icon, Text, Theme, RectButton, Layout} from '@atoms';
import styles from './OrderPromoButton.style';
import React from 'react';
import OrderPromoButtonProps from './OrderPromoButton.type';

const OrderPromoButton: React.FC<OrderPromoButtonProps> = ({
  onPress,
  isPromoApplied,
}) => {
  return (
    <Column padding={{h: 24, v: 16}}>
      <RectButton
        padding={{h: 24, v: 16}}
        borderWidth={1}
        borderColor={Theme.Neutral04}
        borderRadius={16}
        onPress={onPress}>
        <Layout style={styles.voucherLogoContainer}>
          <SvgVoucher width={24} height={24} fill={Theme.Red106} />
        </Layout>
        <Text
          type="b2"
          weight="medium"
          margin={{h: 16}}
          style={styles.promoText}>
          {isPromoApplied ? 'Promo Applied' : 'Apply Promo'}
        </Text>
        <Icon name="Chevron-Right" size={24} color={Theme.Neutral10} />
      </RectButton>
    </Column>
  );
};

export default OrderPromoButton;
