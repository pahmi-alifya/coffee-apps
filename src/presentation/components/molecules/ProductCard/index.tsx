import {Box, Column, RectButton, Spacing, Text, Theme} from '@atoms';
import {TextType} from '@atoms/Text/Text.types';
import {currency} from '@utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Svg, {Path} from 'react-native-svg';
import ProductCardStyle, {
  ProductBackgroundViewBox,
  ProductImageSizeStyle,
  ProductPriceSizeStyle,
  ProductSizeStyle,
  ProductTextSizeStyle,
} from './ProductCard.style';
import ProductCardProps from './ProductCard.types';

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const {product, hasValue = false, notAvailable = false, size = 'big'} = props;
  const {t} = useTranslation();
  const ProductImageSize = ProductImageSizeStyle[size];
  const ProductTextSize = ProductTextSizeStyle[size];
  const ProductSize = ProductSizeStyle[size];
  const ProductPriceSize = ProductPriceSizeStyle[size];
  const ProductViewBox = ProductBackgroundViewBox[size];

  return (
    <Column contentStyle="fitContent" padding={Spacing.Small}>
      <RectButton
        width={ProductSize.w}
        height={ProductSize.h}
        borderRadius={Spacing.Standard}
        foregroundRipple
        onPress={props.onPress}>
        <Column overflow="hidden" borderRadius={Spacing.Standard}>
          <Column
            width={ProductImageSize.width}
            height={ProductImageSize.height}>
            <Svg
              style={ProductCardStyle.background}
              width={141}
              height={47}
              viewBox={ProductViewBox}
              fill="none">
              <Path
                stroke={Theme.Neutral04}
                d="M.5 35.485a16 16 0 0113.196-15.752l108-19.223c9.805-1.745 18.804 5.794 18.804 15.753V47H.5V35.485z"
                fill={Theme.Neutral01}
              />
            </Svg>
            <FastImage
              style={[ProductImageSize, ProductCardStyle.productImage]}
              resizeMode="contain"
              source={{
                uri:
                  product?.product_photo ||
                  'https://storage.googleapis.com/jiwaplus-assets/products_photo/default-product.png',
              }}
            />
          </Column>
          <Column
            style={ProductCardStyle.productDesc}
            borderRadius={{
              bl: 16,
              br: 16,
            }}
            arrangement="between"
            margin={{
              t: -Spacing.Tiny,
            }}
            padding={Spacing.Small}
            contentStyle="fillContainer">
            <Text
              weight="bold"
              numberOfLines={3}
              color={hasValue ? Theme.Red206 : Theme.Neutral10}
              type={ProductTextSize}
              text={product?.product_name || t('loading')}
            />
            {notAvailable ? (
              <Text
                type={ProductTextSize}
                color={Theme.Neutral05}
                text={t('productCard.notAvailable')}
              />
            ) : (
              <Column contentStyle="fixed">
                <Text
                  weight="medium"
                  type={ProductPriceSize as TextType}
                  text={currency(
                    product?.discounted_price || product?.price || 0,
                  )}
                />
                {product?.discounted_price && (
                  <Text
                    textDecorationLine="line-through"
                    weight="medium"
                    type={ProductPriceSize as TextType}
                    text={currency(product?.price)}
                    color={Theme.Red206}
                  />
                )}
              </Column>
            )}
          </Column>
          {hasValue && (
            <Box
              top={ProductSize.h / 2}
              left={-5}
              borderRadius={3}
              height={ProductSize.h / 3}
              width={5}
              backgroundColor={Theme.Red206}
            />
          )}
        </Column>
      </RectButton>
    </Column>
  );
};

export default ProductCard;
