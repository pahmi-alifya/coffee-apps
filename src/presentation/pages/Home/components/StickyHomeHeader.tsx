import {
  Column,
  Icon,
  IconButton,
  Row,
  Spacer,
  Spacing,
  Text,
  TextButton,
  TextInput,
  Theme,
} from '@atoms';
import {useMembershipDetail} from '@hooks/useMembership';
import {useProducts} from '@hooks/useProduct';
import {range} from '@utils';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useHomeContext} from '../Home.context';
import OutletSection from './OutletSection';

interface StickyHomeHeaderProps {
  setSearchKeyword(text: string): void;
}

const StickyHomeHeader: React.FC<StickyHomeHeaderProps> = ({
  setSearchKeyword,
}) => {
  const {t} = useTranslation();
  const context = useHomeContext();

  const {data: membership} = useMembershipDetail();

  const {data: products, isValidating} = useProducts({
    membership_lvl: membership?.data.membership_lvl,
    id_outlet: context.selectedOutlet?.id_outlet,
  });

  const renderEmptyCategory = useCallback(() => {
    const layouts = range(5).map((_, index) => ({
      key: `category-list-${index}`,
      height: 28,
      width: 80,
      borderRadius: 14,
      marginRight: Spacing.Tiny,
    }));

    if (isValidating) {
      return (
        <SkeletonContent
          key="skeleton"
          containerStyle={{flexDirection: 'row'}}
          layout={layouts}
          isLoading={true}
        />
      );
    }

    return null;
  }, [isValidating]);

  return (
    <Column
      contentStyle="fitContent"
      padding={{v: Spacing.Standard}}
      backgroundColor={Theme.Neutral01}>
      <Column contentStyle="fitContent" padding={{h: Spacing.High}}>
        <Text type="s3" weight="bold" text={t('home.orderFromOutlet')} />

        <Spacer length={Spacing.Standard} />

        <OutletSection />

        <Spacer length={Spacing.Standard} />

        <Row>
          <TextInput
            value={context.searchKeyword}
            onChangeText={setSearchKeyword}
            placeholder={t('home.searchMenu')}
            prefixComponent={<Icon name="Search" size={20} />}
            containerProps={{contentStyle: 'fillContainer'}}
            allowClear
          />
          <Spacer length={Spacing.Tiny} horizontal />
          <IconButton
            size={38}
            backgroundColor={Theme.Red206}
            iconProps={{
              color: Theme.Neutral01,
              name: 'Receipt',
              size: 24,
            }}
          />
        </Row>
      </Column>

      <Spacer length={Spacing.Standard} />

      <FlatList
        horizontal
        data={products?.data}
        keyExtractor={(item) => item.category.toString()}
        contentContainerStyle={{paddingHorizontal: Spacing.High}}
        ListEmptyComponent={renderEmptyCategory}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TextButton
            height={28}
            padding={{h: Spacing.Tiny}}
            style={{marginRight: Spacing.Tiny}}
            borderRadius={14}
            borderWidth={1}
            borderColor={Theme.Neutral04}
            textProps={{
              text: item.category || t('loading'),
              type: 'l2',
              weight: 'regular',
            }}
          />
        )}
      />
    </Column>
  );
};

export default StickyHomeHeader;
