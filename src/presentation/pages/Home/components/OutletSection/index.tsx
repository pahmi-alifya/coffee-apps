import {
  Column,
  Icon,
  Image,
  ReanimatedRow,
  ReanimatedText,
  RectButton,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import {ButtonConfigProps} from '@atoms/Button/Button.types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useHomeContext} from '../../Home.context';
import OutletStyle from './Outlet.style';

interface OutletProps extends ButtonConfigProps {}

const SCROLL_OFFSET = 434;

const OutletSection: React.FC<OutletProps> = () => {
  const {t} = useTranslation();
  const context = useHomeContext();

  const animatedNameStyle = useAnimatedStyle(() => {
    const translateY = withTiming(
      context.scrollPosition.value > SCROLL_OFFSET ? 8 : 0,
      {duration: 300},
    );

    return {
      transform: [{translateY}],
    };
  });

  const animatedBrandStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      context.scrollPosition.value > SCROLL_OFFSET ? 0 : 1,
      {duration: 300},
    );

    return {
      opacity,
    };
  });

  return (
    <RectButton
      borderWidth={1}
      borderRadius={16}
      arrangement="center"
      padding={{h: Spacing.Standard}}
      height={54}
      borderColor={Theme.Neutral04}
      onPress={context.handleOutletPress}>
      <Icon color={Theme.Red206} name="Outlet" size={22} />

      <Column arrangement="center" padding={{h: Spacing.Small}}>
        <ReanimatedText
          weight="bold"
          type="l1"
          numberOfLines={1}
          text={context.selectedOutlet?.outlet_name || t('home.selectOutlet')}
          style={animatedNameStyle}
        />

        <ReanimatedRow
          contentStyle="fitContent"
          padding={{t: 4}}
          style={animatedBrandStyle}>
          {context.selectedOutlet?.outlet_brands?.map((brand) => (
            <Image
              key={brand.brand_id}
              source={{uri: brand.brand_logo}}
              style={OutletStyle.logo}
              resizeMode="contain"
            />
          ))}
        </ReanimatedRow>
      </Column>

      <Text weight="regular" type="l1" text={t('home.change')} />
    </RectButton>
  );
};

export default OutletSection;
