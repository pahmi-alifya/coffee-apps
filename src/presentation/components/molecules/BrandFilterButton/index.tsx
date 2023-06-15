import {RectButton, Spacing, Text, Theme} from '@atoms';
import React from 'react';
import FastImage from 'react-native-fast-image';
import BrandFilterButtonStyle from './BrandFilterButton.style';

export type BrandFilterOptionType = {
  content: string; // Can be a text or image url.
  value: number | undefined; // number for Brand ID, undefined if not set.
};

interface Props {
  item: BrandFilterOptionType;
  isSelected: boolean;
  onPress(value?: BrandFilterOptionType): void;
}

const BrandFilterButton: React.FC<Props> = ({item, isSelected, onPress}) => {
  const isDefaultValue = item.value === undefined;
  const borderColor = isSelected ? Theme.Red206 : Theme.Neutral04;
  const backgroundColor = isSelected
    ? isDefaultValue
      ? Theme.Red206
      : Theme.Neutral01
    : Theme.Neutral01;
  const textColor = isSelected ? Theme.Neutral01 : Theme.Neutral10;
  const paddingHorizontal = isDefaultValue ? Spacing.Standard : Spacing.Tiny;

  return (
    <RectButton
      onPress={() => onPress(isDefaultValue ? undefined : item)}
      height={28}
      borderRadius={32}
      backgroundColor={backgroundColor}
      padding={{h: paddingHorizontal}}
      style={[BrandFilterButtonStyle.container, {borderColor}]}>
      {isDefaultValue ? (
        <Text type="l2" color={textColor} text={item.content} />
      ) : (
        <FastImage
          source={{uri: item.content}}
          style={BrandFilterButtonStyle.logo}
          resizeMode="contain"
        />
      )}
    </RectButton>
  );
};

export default BrandFilterButton;
