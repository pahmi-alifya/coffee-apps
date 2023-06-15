import {IconPlusPoint} from '@assets';
import {Column, Image, Row, Spacing, Text, Theme} from '@atoms';
import numberFormat from '@utils/numberFormat';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

interface Props {
  point: number;
  loading: boolean;
}

const PlusPointHeader: React.FC<Props> = ({point, loading}) => {
  const {t} = useTranslation();

  return (
    <Column arrangement="trailing" margin={{b: Spacing.High}}>
      <Text type="l2" weight="regular" color={Theme.Neutral01}>
        {t('pointHistory.totalPoint')}
      </Text>

      <Row margin={{t: Spacing.SuperTiny}}>
        <Image
          source={IconPlusPoint}
          resizeMode="contain"
          style={styles.pointImage}
        />

        <SkeletonContent
          containerStyle={styles.skeletonContainer}
          layout={[{key: 'totalPoint', width: 120, height: 32}]}
          isLoading={!!loading}>
          <Text type="s1" weight="regular" color={Theme.Neutral01}>
            {numberFormat(point)}
          </Text>
        </SkeletonContent>
      </Row>
    </Column>
  );
};

const styles = StyleSheet.create({
  pointImage: {
    height: 24,
    width: 24,
    marginRight: Spacing.Tiny,
  },
  skeletonContainer: {
    flex: 1,
    width: 180,
  },
});

export default PlusPointHeader;
