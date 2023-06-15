import {IconPlusPoint, SvgVoucher} from '@assets';
import {Column, Layout, Row, Separator, Spacer, Text, Theme} from '@atoms';
import {SummaryType} from '@models/TransactionEstimationModel';
import {currency} from '@utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import OrderPaymentSummaryProps from './OrderPaymentSummary.type';

const OrderPaymentSummary: React.FC<OrderPaymentSummaryProps> = ({summary}) => {
  const {t} = useTranslation();

  return (
    <Column contentStyle="fitContent" padding={{v: 16, h: 24}}>
      <Text type="b1" weight="medium">
        {t('orderDetail.summary.title')}
      </Text>
      {summary?.summary.map((item, index) => (
        <Row
          arrangement="between"
          margin={{t: index === 0 ? 16 : 4}}
          key={`order-summary-${index}`}>
          <Text
            type="l1"
            color={
              item.type === SummaryType.Text ? Theme.Neutral10 : Theme.Red206
            }>
            {item.label}
          </Text>
          <Row>
            {item.type === SummaryType.Point && (
              <FastImage
                source={IconPlusPoint}
                style={{width: 16, height: 16}}
              />
            )}
            {item.type === SummaryType.Promo && (
              <Layout
                style={{backgroundColor: Theme.Yellow01}}
                borderRadius={10}>
                <SvgVoucher width={20} height={20} fill={Theme.Red106} />
              </Layout>
            )}
            <Spacer horizontal length={8} />
            <Text
              type="l1"
              weight="medium"
              color={
                item.type === SummaryType.Text ? Theme.Neutral10 : Theme.Red206
              }>
              {currency(item.price)}
            </Text>
          </Row>
        </Row>
      ))}
      <Spacer length={16} />
      <Separator height={1} backgroundColor={Theme.Neutral04} />
      <Row arrangement="between" margin={{t: 16}}>
        <Text type="l1" weight="bold">
          Total Pembayaran
        </Text>
        <Text type="l1" weight="bold">
          {currency(summary?.grand_total || 0)}
        </Text>
      </Row>
    </Column>
  );
};

export default OrderPaymentSummary;
