import {Theme} from '@atoms';
import {TextType} from '@atoms/Text/Text.types';
import {StyleSheet} from 'react-native';
import {ProductCardSizeType} from './ProductCard.types';

export const ProductImageSizeStyle = StyleSheet.create({
  big: {
    width: 132,
    height: 132,
  },
  small: {
    width: 82,
    height: 82,
  },
});

export const ProductSizeStyle: Record<
  ProductCardSizeType,
  Record<string, number>
> = {
  big: {
    w: 132,
    h: 262,
  },
  small: {
    w: 82,
    h: 182,
  },
};
export const ProductTextSizeStyle: Record<ProductCardSizeType, TextType> = {
  big: 'b1',
  small: 'l1',
};

export const ProductBackgroundViewBox = {
  big: '0 0 150.5 47',
  small: '0 0 242 47',
};
export const ProductPriceSizeStyle: Record<ProductCardSizeType, TextType> = {
  big: 'l1',
  small: 'l2',
};
const ProductCardStyle = StyleSheet.create({
  background: {
    position: 'absolute',
    bottom: -5,
  },
  productImage: {
    aspectRatio: 1,
    position: 'absolute',
  },
  productDesc: {
    borderWidth: 1,
    borderTopWidth: 0,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    backgroundColor: Theme.Neutral01,
    borderColor: Theme.Neutral03,
  },
});

export default ProductCardStyle;
