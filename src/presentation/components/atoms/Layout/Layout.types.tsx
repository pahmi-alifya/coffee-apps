import {ImageBackgroundProps, ScrollViewProps, ViewProps} from 'react-native';

export type LayoutType =
  | 'safeareaview'
  | 'view'
  | 'scrollview'
  | 'imagebackground';
export interface LayoutScrollView extends ScrollViewProps {
  type?: 'scrollview';
}

export interface LayoutImageBackground extends ImageBackgroundProps {
  type?: 'imagebackground';
}
export interface LayoutView extends ViewProps {
  type?: 'view' | 'safeareaview';
}

export type LayoutProps = LayoutScrollView | LayoutView | LayoutImageBackground;
