import {
  Column,
  Icon,
  Row,
  Separator,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import {BottomSheetSelect} from '@molecules';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styles from './PickupOrderAddressSummary.style';
import PickupOrderAddressSummaryProps from './PickupOrderAddressSummary.type';

const PickupOrderAddressSummary: React.FC<PickupOrderAddressSummaryProps> = ({
  activePickupTime,
  outlet,
  pickupTimeSelections = [],
  onClickActivePickup,
}) => {
  const {t} = useTranslation();

  const decideShownPickupTimeSelection = (text: string) => {
    if (text === 'NOW') {
      return 'Ambil Sekarang';
    }
    return `Dalam jangka waktu ${text} menit`;
  };

  const pickupTimeSelectionElements = pickupTimeSelections.map((item) => {
    return {
      key: item,
      content: <Text type="b2">{decideShownPickupTimeSelection(item)}</Text>,
    };
  });

  return (
    <Column
      contentStyle="fitContent"
      padding={{h: Spacing.High, v: Spacing.Standard}}>
      <Row>
        <Column
          style={styles.pickupIconContainer}
          contentStyle="fitContent"
          alignment="center"
          arrangement="center">
          <Icon name="Pick-Up" color={Theme.Red206} size={24} />
        </Column>
        <Spacer horizontal length={Spacing.Small} />
        <Text type="b1" weight="medium" margin={{r: Spacing.Tiny}}>
          {t('orderDetail.pickup.title')}
        </Text>
        <Text
          type="l1"
          weight="regular"
          color={Theme.Neutral05}
          margin={{r: Spacing.SuperTiny}}
          style={styles.distanceText}>
          {`${outlet?.distance_in_km || 0} km`}
        </Text>
        <Text type="l2" weight="regular" color={Theme.Neutral07}>
          {t('orderDetail.pickup.pickupDistance')}
        </Text>
      </Row>
      <Row style={styles.outletButton} arrangement="leading">
        <Icon
          name="Outlet"
          color={Theme.Red206}
          size={20}
          style={styles.outletLogo}
        />
        <Text type="l1" color={Theme.Neutral10}>
          {outlet?.outlet_name || ''}
        </Text>
      </Row>
      <Separator height={1} backgroundColor={Theme.Neutral04} />
      <Column contentStyle="fitContent" margin={{t: Spacing.Standard}}>
        <Text type="l2" weight="medium">
          {t('orderDetail.pickup.choosePickupTime')}
        </Text>
        <Separator height={8} backgroundColor={Theme.Neutral01} />
        <BottomSheetSelect
          title="Pilih Waktu Pick Up"
          rectButtonProps={{
            borderRadius: 24,
            borderWidth: 1,
            borderColor: Theme.Neutral04,
            padding: 12,
            arrangement: 'between',
          }}
          triggerElement={
            <Row>
              <Icon
                name="Clock"
                color={Theme.Neutral10}
                size={16}
                style={styles.pickupTimeLogo}
              />
              <Text type="l1" style={styles.pickupTimeText}>
                {decideShownPickupTimeSelection(activePickupTime)}
              </Text>
              <Icon name="Chevron-Down" size={12} />
            </Row>
          }
          selections={pickupTimeSelectionElements}
          confirmButtonText="Konfirmasi"
          value={activePickupTime}
          onConfirm={onClickActivePickup}
        />
      </Column>
    </Column>
  );
};

export default PickupOrderAddressSummary;
