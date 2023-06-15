import {SvgActiveVoucher, SvgInactiveVoucher, SvgVoucher} from '@assets';
import {Checkbox, Column, Layout, Row, Spacing, Text, Theme} from '@atoms';
import React from 'react';
import VoucherItemProps from './VoucherItem.type';
import styles from './VoucherItem.style';

const VoucherItem: React.FC<VoucherItemProps> = ({
  title,
  subtitle,
  activePeriod,
  onPress,
  isActive = false,
  containerStyle = {},
}) => {
  const BackgroundSvg = isActive ? SvgActiveVoucher : SvgInactiveVoucher;
  return (
    <Layout style={containerStyle}>
      <BackgroundSvg
        width="100%"
        preserveAspectRatio="none"
        style={styles.background}
      />
      <Row padding={{h: Spacing.High}} height={112}>
        <Layout style={styles.voucherLogo}>
          <SvgVoucher width={24} height={24} />
        </Layout>
        <Column margin={{l: Spacing.Standard}}>
          <Text type="b1" weight="medium">
            {title}
          </Text>
          <Text type="l2">{subtitle}</Text>
          <Text type="l2" color={Theme.Neutral05}>
            {activePeriod}
          </Text>
        </Column>
        <Checkbox defaultValue={isActive} onChange={onPress} />
      </Row>
    </Layout>
  );
};

export default VoucherItem;
