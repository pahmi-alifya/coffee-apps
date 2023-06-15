import {JiwaIconName} from '@atoms/Icon/Icon.types';
import Reanimated from 'react-native-reanimated';

export interface TabBarProps {
  onPressTab(index: number | string): void;
  tabs: Array<{title: string; icon?: JiwaIconName}>;
  position?: Reanimated.SharedValue<number>;
}
