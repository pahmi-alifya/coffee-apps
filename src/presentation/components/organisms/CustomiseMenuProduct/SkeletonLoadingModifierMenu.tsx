import {Spacing} from '@atoms';
import {random, range} from '@utils';
import React, {useMemo} from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {ICustomViewStyle} from 'react-native-skeleton-content-nonexpo/lib/Constants';

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const TOTAL_ITEM = 3;

const SkeletonLoadingModifierMenu: React.FC<Props> = ({loading, children}) => {
  const items = useMemo((): ICustomViewStyle[] => {
    return range(TOTAL_ITEM).map((_, index) => ({
      key: `item-${index}`,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.Small,
      children: [
        {
          key: 'title',
          width: random(60, 100),
          height: 20,
        },
        {
          key: 'price',
          width: random(30, 70),
          height: 20,
          marginRight: Spacing.Tiny,
        },
      ],
    }));
  }, []);

  return (
    <SkeletonContent
      containerStyle={{}}
      animationDirection="horizontalRight"
      isLoading={loading}
      layout={[
        {
          key: 'title',
          width: 200,
          height: 22,
          marginBottom: Spacing.High,
        },
        {
          key: 'list',
          children: items,
        },
      ]}>
      {children}
    </SkeletonContent>
  );
};

export default SkeletonLoadingModifierMenu;
