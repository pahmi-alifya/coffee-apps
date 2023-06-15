import {Column, Image, Spacer, Spacing, Text} from '@atoms';
import {ContainerConfigProps} from '@atoms/Container/Container.types';
import React from 'react';
import {FastImageProps} from 'react-native-fast-image';
import EmptyPlaceholderStyle from './EmptyPlaceholder.style';

interface EmptyPlaceholderType extends ContainerConfigProps {
  title: string;
  source: FastImageProps['source'];
  description: string;
}

const EmptyPlaceholder = (props: EmptyPlaceholderType) => {
  const {source, title, description, ...rest} = props;
  return (
    <Column
      width={300}
      height={400}
      arrangement="center"
      alignment="center"
      margin={{t: Spacing.Standard}}
      style={EmptyPlaceholderStyle.selfCenter}
      {...rest}>
      <Image
        source={source}
        resizeMode="contain"
        style={EmptyPlaceholderStyle.image}
      />
      <Text type="b1" weight="bold" align="center">
        {title}
      </Text>
      <Spacer length={Spacing.SuperTiny} />
      <Text type="l1" weight="regular" align="center">
        {description}
      </Text>
    </Column>
  );
};

export default EmptyPlaceholder;
