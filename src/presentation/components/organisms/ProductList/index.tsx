import {Column, Row, Spacing, Text} from '@atoms';
import {ProductType} from '@models';
import ProductCard from '@molecules/ProductCard';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {range} from '@utils';
import React, {useCallback} from 'react';

interface ProductListProps {
  title?: string;
  isLoading?: boolean;
  data?: ProductType[]; // Will change any type after product on home was created
  onPressItem?: (item: ProductType) => void; // Will change any type after product on home was created
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  data,
  isLoading = true,
  onPressItem,
}) => {
  const renderEmptyPlaceholder = useCallback(() => {
    if (isLoading) {
      return (
        <Row width={300} height={300}>
          {range(4).map((_, index) => (
            <ProductCard key={index} disabled />
          ))}
        </Row>
      );
    }

    return <Column />;
  }, [isLoading]);

  const renderItem: ListRenderItem<ProductType> = useCallback(
    ({item}) => (
      <ProductCard onPress={() => onPressItem?.(item)} product={item} />
    ),
    [onPressItem],
  );

  return (
    <Column height={320}>
      <Text
        padding={{h: Spacing.High}}
        type="s3"
        weight="bold"
        text={title || 'Loading..'}
      />
      <Column>
        <FlashList
          data={data}
          horizontal
          ListEmptyComponent={renderEmptyPlaceholder}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Spacing.Small,
          }}
          estimatedItemSize={164}
          keyExtractor={(item) => item.id_product.toString()}
          renderItem={renderItem}
        />
      </Column>
    </Column>
  );
};

export default ProductList;
