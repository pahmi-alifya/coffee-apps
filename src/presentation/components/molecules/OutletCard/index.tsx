import {
  Box,
  Column,
  IconButton,
  ReanimatedColumn,
  RectButton,
  Row,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import {OutletType} from '@models';
import {openInMaps} from '@utils';
import getDay from 'date-fns/getDay';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {FadeInDown, FadeInUp, Layout} from 'react-native-reanimated';
import OutletCardStyle from './OutletCard.style';

interface Props extends OutletType {
  isSelected: boolean;
  onPress(): void;
}

const OutletCard: React.FC<Props> = ({
  isSelected,
  outlet_name,
  outlet_code,
  is_open,
  outlet_schedules,
  outlet_address,
  outlet_brands,
  distance_in_km,
  outlet_lat,
  outlet_long,
  onPress,
}) => {
  const {t} = useTranslation();
  const todaysOpenTime = useMemo(() => {
    const today = getDay(new Date());
    const todaySchedule = outlet_schedules.find(
      (schedule) => schedule.day_of_week === today,
    );

    if (todaySchedule) {
      return todaySchedule.open_time;
    }
  }, [outlet_schedules]);

  const sortedOutletBrands = useMemo(
    () => outlet_brands.sort((a, b) => a.brand_order - b.brand_order),
    [outlet_brands],
  );

  const handleOpenMap = useCallback(() => {
    openInMaps(outlet_lat, outlet_long, outlet_name);
  }, [outlet_lat, outlet_long, outlet_name]);

  return (
    <ReanimatedColumn
      entering={FadeInDown}
      exiting={FadeInUp}
      layout={Layout.springify()}
      padding={{h: Spacing.High, v: Spacing.Small}}>
      <RectButton
        onPress={onPress}
        borderRadius={Spacing.Standard}
        disabled={!is_open}>
        <Column
          padding={{h: Spacing.High, v: Spacing.Standard}}
          borderRadius={Spacing.Standard}
          style={
            isSelected
              ? OutletCardStyle.borderSelected
              : OutletCardStyle.borderDefault
          }>
          <Text type="b1" weight="bold" text={outlet_name} />
          <Spacer length={4} />
          <Row>
            <Text type="l1" text={outlet_code} />
            <Spacer length={8} horizontal />
            {is_open && (
              <Text
                type="l2"
                color={Theme.Green06}
                text={t('outlet.open')}
                style={OutletCardStyle.labelOpen}
              />
            )}
            <Spacer />
            <Text
              type="l2"
              color={Theme.Neutral05}
              text={`${distance_in_km}km`}
              style={OutletCardStyle.labelDistance}
            />
            <Spacer length={8} horizontal />
            <IconButton
              size={24}
              onPress={handleOpenMap}
              arrangement="center"
              backgroundColor={Theme.Red201}
              iconProps={{
                name: 'Direction',
                color: Theme.Red206,
                size: 16,
              }}
            />
          </Row>
          <Spacer length={4} />
          <Text type="l1" color={Theme.Neutral05} text={outlet_address} />
          <Spacer length={10} />
          <Row>
            {sortedOutletBrands.map((brand, index) => (
              <FastImage
                key={brand.brand_id}
                source={{uri: brand.brand_logo}}
                style={[
                  OutletCardStyle.brand,
                  {marginRight: index < outlet_brands.length ? 30 : 0},
                ]}
                resizeMode="contain"
              />
            ))}
          </Row>

          {!is_open && (
            <Box
              top={0}
              right={0}
              bottom={0}
              left={0}
              backgroundColor={Theme.Black50}
              arrangement="trailing">
              <Column
                contentStyle="fitContent"
                backgroundColor={Theme.Neutral01o20}
                padding={{h: Spacing.High, v: Spacing.Tiny}}
                alignment="end">
                <Text
                  type="l1"
                  weight="bold"
                  color={Theme.Neutral01}
                  text={t('outlet.closed')}
                />
                <Text
                  type="l2"
                  color={Theme.Neutral01}
                  text={`${t('outlet.openAgainAt')} ${todaysOpenTime}`}
                />
              </Column>
            </Box>
          )}
        </Column>
      </RectButton>
    </ReanimatedColumn>
  );
};

export default OutletCard;
