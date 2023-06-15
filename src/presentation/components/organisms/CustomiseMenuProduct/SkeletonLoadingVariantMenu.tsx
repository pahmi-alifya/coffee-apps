import {Spacing} from '@atoms';
import {random, range} from '@utils';
import React, {useMemo} from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {ICustomViewStyle} from 'react-native-skeleton-content-nonexpo/lib/Constants';

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const TOTAL_ITEM = 6;

const SkeletonLoadingVariantMenu: React.FC<Props> = ({loading, children}) => {
  const items = useMemo((): ICustomViewStyle[] => {
    return range(TOTAL_ITEM).map((_, index) => ({
      key: `item-${index}`,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.High,
      children: [
        {
          key: 'title',
          width: random(60, 100),
          height: 20,
        },
        {
          key: 'menus',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          children: [
            {
              key: 'menu_1',
              width: random(30, 70),
              height: 40,
              marginRight: Spacing.Tiny,
            },
            {
              key: 'menu_2',
              width: random(30, 70),
              height: 40,
              marginRight: Spacing.Tiny,
            },
            {
              key: 'menu_3',
              width: random(30, 70),
              height: 40,
              marginRight: Spacing.Tiny,
            },
          ],
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
          key: 'list',
          children: items,
        },
      ]}>
      {children}
    </SkeletonContent>
  );
};

export default SkeletonLoadingVariantMenu;
