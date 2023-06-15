import {
  BorderlessButton,
  Icon,
  Row,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import React from 'react';

export interface BackableHeaderProps {
  variant?: 'backable';
  onPress(): void;
  title: string;
}

const BackableHeader: React.FC<BackableHeaderProps> = ({onPress, title}) => {
  return (
    <Row>
      <BorderlessButton onPress={onPress}>
        <Icon name="Arrow-Left" color={Theme.Neutral01} size={32} />
      </BorderlessButton>

      <Spacer length={Spacing.Standard} horizontal />

      <Text type="b1" weight="medium" color={Theme.Neutral01}>
        {title}
      </Text>
    </Row>
  );
};

export default BackableHeader;
