import {Column, RectButton, Row, Spacing, Text, Theme} from '@atoms';
import {DrawerMenuType} from '@navigation/DrawerNavigation';
import React from 'react';

export interface DrawerMenuProps extends Omit<DrawerMenuType, 'position'> {}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  text,
  subText,
  MenuIcon,
  onPress,
}) => {
  return (
    <RectButton onPress={onPress} foregroundRipple padding={{h: Spacing.High}}>
      <MenuIcon width={32} height={32} />
      <Column padding={Spacing.Standard}>
        <Row arrangement="between">
          <Text type="b1" text={text} />
          {!!subText && (
            <Text type="l1" color={Theme.Neutral05} text={subText} />
          )}
        </Row>
      </Column>
    </RectButton>
  );
};

export default DrawerMenu;
