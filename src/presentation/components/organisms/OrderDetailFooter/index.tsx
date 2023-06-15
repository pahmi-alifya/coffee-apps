import {loader, SvgHorn} from '@assets';
import {
  Column,
  Icon,
  Row,
  Theme,
  Text,
  RectButton,
  Spacer,
  Spacing,
} from '@atoms';
import {currency} from '@utils';
import {isEmpty} from 'lodash';
import React, {useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import styles from './OrderDetailFooter.style';
import OrderDetailFooterProps from './OrderDetailFooter.type';
import Lottie from 'lottie-react-native';

const OrderDetailFooter: React.FC<OrderDetailFooterProps> = ({
  activePaymentMethod,
  totalPrice,
  showXpBanner = false,
  onChoosePayment = () => {},
  onSubmitTransaction = () => {},
}) => {
  const [firstTimeSubmit, setIsFirstTimeSubmit] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countDownTimer, setCountdownTimer] = useState(0);
  const isPaymentSelected = useMemo(
    () => !isEmpty(activePaymentMethod),
    [activePaymentMethod],
  );

  const decideConfirmTitle = () => {
    if (!isPaymentSelected) {
      return 'Pilih Pembayaran';
    } else if (isSubmitting) {
      return 'Batalkan Pesanan';
    } else {
      return 'Bayar';
    }
  };

  const handlePrimaryButton = () => {
    if (!isPaymentSelected) {
      // If no payment method is supplied then go to choose payment handler
      return onChoosePayment();
    } else if (isSubmitting) {
      // If it's submitting, then cancel the timeout
      setIsSubmitting(false);
      clearTimeout(countDownTimer);
      return;
    } else if (isPaymentSelected && firstTimeSubmit) {
      // If there's a payment method selected and it's the first time
      // then show the batalkan pesanan flow
      setIsFirstTimeSubmit(false);
      setIsSubmitting(true);
      setCountdownTimer(setTimeout(onSubmitTransaction, 5000));
      return;
    } else if (isPaymentSelected && !firstTimeSubmit) {
      // If it's not the first time the user submit
      // then create the transaction immediately
      return onSubmitTransaction();
    }
  };

  return (
    <Column withSafeArea="bottomOnly" contentStyle="fitContent">
      {showXpBanner && (
        <Row
          margin={{b: -1 * Spacing.High}}
          padding={{h: Spacing.High, t: Spacing.Small, b: Spacing.Large}}
          backgroundColor={Theme.Red206}
          borderRadius={{tl: 24, tr: 24}}>
          <SvgHorn />
          <Column margin={{l: Spacing.Standard}}>
            <Text type="b2" color={Theme.Neutral01} weight="bold">
              Pesan dan Antar Sekarang
            </Text>
            <Text type="l2" color={Theme.Neutral01}>
              Bakal dapet 100XP untuk transaksi ini
            </Text>
          </Column>
        </Row>
      )}
      <Column
        contentStyle="fitContent"
        padding={{h: Spacing.High, v: Spacing.Standard}}
        backgroundColor={Theme.Neutral01}
        borderRadius={{tl: 24, tr: 24}}>
        {isPaymentSelected && (
          <RectButton
            backgroundColor={Theme.Neutral02}
            borderRadius={24}
            arrangement="between"
            padding={{v: Spacing.Tiny, h: Spacing.Standard}}
            onPress={onChoosePayment}>
            <FastImage
              source={{
                uri: activePaymentMethod?.logo || '',
              }}
              style={styles.paymentMethodLogo}
            />
            <Text type="l1" margin={{l: Spacing.SuperTiny}}>
              {activePaymentMethod?.payment_name || ''}
            </Text>
            <Text
              type="b2"
              weight="bold"
              style={styles.priceText}
              align="right"
              margin={{r: Spacing.SuperTiny}}>
              {currency(totalPrice)}
            </Text>
            <Icon name="Chevron-Down" size={18} />
          </RectButton>
        )}
        <RectButton
          padding={{v: Spacing.Small}}
          backgroundColor={isSubmitting ? Theme.Neutral01 : Theme.Red206}
          borderRadius={24}
          borderWidth={1}
          borderColor={Theme.Red206}
          style={styles.payButton}
          onPress={handlePrimaryButton}>
          <Text
            type="b1"
            color={isSubmitting ? Theme.Neutral10 : Theme.Neutral01}>
            {decideConfirmTitle()}
          </Text>
          {isSubmitting && (
            <>
              <Spacer horizontal length={8} />
              <Lottie style={styles.loader} source={loader} autoPlay />
            </>
          )}
        </RectButton>
      </Column>
    </Column>
  );
};

export default OrderDetailFooter;
