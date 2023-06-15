import {IllustrationEmptySearch} from '@assets';
import {Column, Theme} from '@atoms';
import useDebounce from '@hooks/useDebounce';
import {useMembershipDetail} from '@hooks/useMembership';
import {useProducts} from '@hooks/useProduct';
import {ProductType} from '@models';
import {ProductList} from '@organisms';
import {EmptyPlaceholder} from '@templates';
import {range} from '@utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useHomeContext} from '../Home.context';

interface Props {
  handleProductPress(item: ProductType): void;
}

const ProductSection: React.FC<Props> = ({handleProductPress}) => {
  const {t} = useTranslation();
  const context = useHomeContext();
  const debouncedSearchKeyword = useDebounce(context.searchKeyword);
  const {data: membership} = useMembershipDetail();

  const {
    data: products,
    error: productsError,
    isValidating,
  } = useProducts({
    membership_lvl: membership?.data.membership_lvl,
    id_outlet: context.selectedOutlet?.id_outlet,
    product_name:
      debouncedSearchKeyword.length > 2 ? debouncedSearchKeyword : '',
  });

  if (!products?.data?.length) {
    if (debouncedSearchKeyword.length > 2) {
      return (
        <EmptyPlaceholder
          title={t('home.notFound', {keyword: debouncedSearchKeyword})}
          source={IllustrationEmptySearch}
          description={t('home.notFoundDesc')}
        />
      );
    }
    if (productsError) {
      return (
        <EmptyPlaceholder
          title={t('home.notFound', {keyword: debouncedSearchKeyword})}
          source={IllustrationEmptySearch}
          description={t('home.notFoundDesc')}
        />
      );
    }
    return (
      <Column backgroundColor={Theme.Neutral01}>
        {range(4).map((_, index) => (
          <ProductList key={index} />
        ))}
      </Column>
    );
  }

  return (
    <Column>
      {products?.data.map((item) => (
        <ProductList
          key={item.id_product_category}
          data={item.products}
          title={item.category}
          onPressItem={handleProductPress}
          isLoading={isValidating}
        />
      ))}
    </Column>
  );
};

export default ProductSection;
