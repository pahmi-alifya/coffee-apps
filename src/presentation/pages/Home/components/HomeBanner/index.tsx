import {Spacing} from '@atoms';
import {useBanner} from '@hooks/useBanner';
import {Carousel} from '@molecules';
import React from 'react';
import {useWindowDimensions} from 'react-native';

const BANNER_HORIZONTAL_OFFSET = Spacing.High * 2;
const BANNER_RATIO = 0.5;

interface Props {
  onBannerPress(bannerId: number): void;
}

const HomeBanner: React.FC<Props> = ({onBannerPress}) => {
  const {width: screenWidth} = useWindowDimensions();
  const bannerWidth = screenWidth - BANNER_HORIZONTAL_OFFSET;
  const bannerHeight = bannerWidth * BANNER_RATIO;

  const {data: banners} = useBanner();

  return (
    <Carousel
      data={banners?.data || []}
      itemWidth={bannerWidth}
      itemHeight={bannerHeight}
      autoSlideInterval={3000}
      onItemPress={onBannerPress}
    />
  );
};

export default HomeBanner;
