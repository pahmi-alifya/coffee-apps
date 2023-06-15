import {IllustrationEmptyHistoryPoint} from '@assets';
import {Column, Image, Spacer, Spacing, Text} from '@atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

interface Props {
  isUsedPoint?: boolean;
}

const PointHistoryEmptyPlaceholder: React.FC<Props> = ({isUsedPoint}) => {
  const {t} = useTranslation();

  return (
    <Column margin={{t: Spacing.Standard}}>
      <Image
        source={IllustrationEmptyHistoryPoint}
        resizeMode="contain"
        style={styles.image}
      />

      <Text type="b1" weight="bold" align="center">
        {t('pointHistory.emptyPlaceholderTitle')}
      </Text>

      <Spacer length={Spacing.SuperTiny} />

      <Text type="l1" weight="regular" align="center">
        {isUsedPoint
          ? t('pointHistory.emptyPlaceholderUsedPointDescription')
          : t('pointHistory.emptyPlaceholderEarnedPointDescription')}
      </Text>
    </Column>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: Spacing.High,
  },
});

export default PointHistoryEmptyPlaceholder;
