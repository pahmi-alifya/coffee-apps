import React from 'react';
import FastImage from 'react-native-fast-image';
import ImageProps from './Image.types';

const Image = (props: ImageProps) => {
  return <FastImage {...props} />;
};

export default Image;
