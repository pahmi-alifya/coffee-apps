import {ContainerConfigProps} from '@atoms/Container/Container.types';
import {BannerType} from '@models';

interface HomeBannerProps extends ContainerConfigProps {
  data: BannerType[];
  timer?: number;
  initialPage?: number;
  onPressBanner?: (val: BannerType, index: number) => void;
}

export default HomeBannerProps;
