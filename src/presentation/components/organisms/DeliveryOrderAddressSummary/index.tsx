import {
  Column,
  Icon,
  RectButton,
  Row,
  Separator,
  Spacer,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {BottomSheetSelect} from '@molecules';
import {currency} from '@utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './DeliveryOrderAddressSummary.style';
import DeliveryOrderAddressSummaryProps from './DeliveryOrderAddressSummary.type';

const DeliveryOrderAddressSummary: React.FC<
  DeliveryOrderAddressSummaryProps
> = ({
  outlet,
  address,
  addressNotes,
  activeCourier,
  deliveryCourierSelections = [],
  onPressChangeAddress,
  onPressChangeAddressNotes,
  onPressChangeCourier,
}) => {
  const {t} = useTranslation();
  const courierSelectionElements = deliveryCourierSelections.map((courier) => ({
    key: courier.name,
    content: (
      <>
        <FastImage
          source={{uri: courier.image}}
          style={styles.courierChoiceLogo}
        />
        <Spacer horizontal length={Spacing.Standard} />
        <Text type="b2" style={styles.courierName}>
          {courier.name}
        </Text>
        <Text type="b2" weight="medium">
          {currency(courier.price)}
        </Text>
        <Spacer horizontal length={Spacing.Standard} />
      </>
    ),
  }));

  const handleConfirmCourier = (key: string) => {
    const newActiveCourier = deliveryCourierSelections.find(
      (courier) => courier.name === key,
    );
    if (newActiveCourier) {
      onPressChangeCourier(newActiveCourier);
    }
  };

  return (
    <Column
      contentStyle="fitContent"
      padding={{h: Spacing.High, v: Spacing.Standard}}>
      <Row>
        <Column
          style={styles.deliveryIconContainer}
          contentStyle="fitContent"
          alignment="center"
          arrangement="center"
          margin={{r: Spacing.Small}}>
          <Icon name="Delivery" color={Theme.Red206} size={24} />
        </Column>
        <Text type="b1" weight="medium" margin={{r: Spacing.Tiny}}>
          {t('orderDetail.delivery.title')}
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
      <Separator height={1} />
      <Column margin={{t: Spacing.Standard}}>
        <Row arrangement="between">
          <Text type="l2" weight="medium">
            {t('orderDetail.delivery.address')}
          </Text>
          <TextButton
            textProps={{
              type: 'l2',
              children: t('orderDetail.delivery.changeAddress'),
            }}
            borderWidth={1}
            borderColor={Theme.Neutral10}
            padding={{v: Spacing.Tiny, h: Spacing.Small}}
            borderRadius={32}
            onPress={onPressChangeAddress}
          />
        </Row>
        <Text type="b2" weight="medium" margin={{t: Spacing.Tiny}}>
          {address || ''}
        </Text>
        <Column
          padding={Spacing.Tiny}
          backgroundColor={Theme.Neutral02}
          borderRadius={8}
          margin={{t: Spacing.Tiny}}>
          <Text type="l2" color={Theme.Neutral05}>
            {t('orderDetail.delivery.notes')}
          </Text>
          <Row margin={{t: Spacing.SuperTiny}}>
            <Icon
              name="Notes"
              color={Theme.Neutral05}
              size={12}
              style={styles.noteLogo}
            />
            <Text type="l2" color={Theme.Neutral05}>
              {addressNotes || ''}
            </Text>
          </Row>
        </Column>
        <Column margin={{t: Spacing.Tiny}}>
          <RectButton
            borderWidth={1}
            borderColor={Theme.Neutral10}
            padding={{v: Spacing.Tiny, h: Spacing.Small}}
            borderRadius={32}
            alignSelf="flex-start"
            onPress={onPressChangeAddressNotes}>
            <Icon
              name="Edit"
              color={Theme.Red206}
              style={styles.editNoteLogo}
            />
            <Text type="l2">{t('orderDetail.delivery.changeNotes')}</Text>
          </RectButton>
        </Column>
      </Column>
      <Column margin={{t: Spacing.Standard}}>
        <Text type="l2" weight="medium">
          {t('orderDetail.delivery.courierChoice')}
        </Text>
        <Spacer length={Spacing.Tiny} />
        <BottomSheetSelect
          title="Pilih Kurir"
          rectButtonProps={{
            borderRadius: 32,
            borderWidth: 1,
            borderColor: Theme.Neutral04,
            padding: Spacing.Tiny,
            arrangement: 'between',
          }}
          triggerElement={
            <>
              <FastImage
                source={{uri: activeCourier?.image || ''}}
                style={styles.courierLogo}
              />
              <Text type="b2" style={styles.courierName}>
                {activeCourier?.name || ''}
              </Text>
              <Text type="b2" weight="medium" margin={{r: Spacing.Small}}>
                {currency(activeCourier?.price || 0)}
              </Text>
              <Icon name="Chevron-Down" size={12} />
            </>
          }
          value={activeCourier?.name || ''}
          selections={courierSelectionElements}
          confirmButtonText="Konfirmasi"
          onConfirm={handleConfirmCourier}
        />
      </Column>
    </Column>
  );
};

export default DeliveryOrderAddressSummary;
