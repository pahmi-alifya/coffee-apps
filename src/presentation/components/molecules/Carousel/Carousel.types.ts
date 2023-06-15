import {PagerViewProps} from 'react-native-pager-view';

export interface CarouselItem {
  id: number;
  image: string;
}

interface CarouselProps extends Omit<PagerViewProps, 'children'> {
  data: CarouselItem[];
  itemWidth: number;
  itemHeight: number;
  initialPage?: number;
  autoSlideInterval?: number;
  onItemPress?(id: CarouselItem['id'], index: number): void;
}

export default CarouselProps;
