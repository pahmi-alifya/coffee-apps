import {Spacing} from '@atoms';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {ICustomViewStyle} from 'react-native-skeleton-content-nonexpo/lib/Constants';

const TOTAL_ITEM = 5;

interface Props {}

const PointHistoryListSkeletonLoading: React.FC<Props> = () => {
  const layouts = useMemo((): ICustomViewStyle[] => {
    return Array.from({length: TOTAL_ITEM}).map((_, index) => ({
      key: `item_${index}`,
      marginBottom: Spacing.High,
      children: [
        {
          key: 'firstRow',
          justifyContent: 'space-between',
          marginBottom: Spacing.Tiny,
          flexDirection: 'row',
          children: [
            {
              key: 'createdAt',
              width: '45%',
              height: 16,
            },
            {
              key: 'point',
              width: 100,
              height: 16,
            },
          ],
        },
        {
          key: 'description',
          width: '80%',
          height: 22,
          marginBottom: Spacing.Tiny,
        },
        {
          key: 'expiredAt',
          width: '23%',
          height: 16,
          marginBottom: Spacing.Tiny,
        },
      ],
    }));
  }, []);

  return (
    <SkeletonContent
      containerStyle={styles.container}
      animationDirection="horizontalRight"
      isLoading={true}
      layout={layouts}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.High,
  },
});

export default PointHistoryListSkeletonLoading;
