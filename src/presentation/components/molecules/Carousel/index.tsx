import {Column, RectButton, Row, Spacer, Spacing, Theme} from '@atoms';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import PagerView from 'react-native-pager-view';
import CarouselStyle from './Carousel.style';
import CarouselProps from './Carousel.types';

const Carousel: React.FC<CarouselProps> = ({
  data,
  itemWidth,
  itemHeight,
  initialPage = 0,
  autoSlideInterval,
  onItemPress,
  style,
  ...restProps
}) => {
  const [page, setPage] = useState(initialPage);
  const pageViewRef = useRef<PagerView>(null);

  useEffect(() => {
    let interval: number;

    if (autoSlideInterval) {
      interval = setInterval(() => {
        setPage((prevState) => {
          const nextState = prevState + 1;
          pageViewRef.current?.setPage(nextState % data.length);

          return nextState;
        });
      }, autoSlideInterval);
    }

    return () => clearTimeout(interval);
  }, [autoSlideInterval, data.length]);

  return (
    <>
      <PagerView
        ref={pageViewRef}
        initialPage={initialPage}
        orientation="horizontal"
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
        style={[{height: itemHeight}, style]}
        {...restProps}>
        {data.map((item, index) => (
          <Column key={item.id} alignment="center">
            <RectButton
              onPress={() => onItemPress && onItemPress(item.id, index)}
              width={itemWidth}
              height={itemHeight}
              borderRadius={Spacing.Standard}
              foregroundRipple>
              <FastImage
                source={{uri: item.image}}
                style={CarouselStyle.banner}
              />
            </RectButton>
          </Column>
        ))}
      </PagerView>

      <Spacer length={Spacing.Tiny} />

      <Row arrangement="center">
        {data.map((_, index) => (
          <Column
            width={6}
            height={6}
            borderRadius={3}
            margin={{h: 4}}
            backgroundColor={page === index ? Theme.Red206 : Theme.Neutral04}
          />
        ))}
      </Row>
    </>
  );
};

export default Carousel;
