import React from 'react';
import {Box, IconButton, Text, Theme} from '@atoms';

interface FloatingCartProps {
  size: number;
  qty?: number;
  onPress: () => void;
}
const FloatingCart: React.FC<FloatingCartProps> = (props) => {
  const {size = 50, qty, onPress} = props;
  return (
    <Box bottom={30} right={20}>
      <IconButton
        size={size}
        backgroundColor={Theme.Red206}
        iconProps={{
          name: 'Shopping-bag-line',
          size: 32,
          color: Theme.Neutral01,
        }}
        onPress={onPress}
      />
      {qty && (
        <Box
          width={28}
          height={20}
          arrangement="center"
          alignment="center"
          top={-5}
          right={-5}
          borderRadius={10}
          backgroundColor={Theme.Red106}>
          <Text
            type="l1"
            text={qty as unknown as string}
            color={Theme.Neutral01}
          />
        </Box>
      )}
    </Box>
  );
};
export default FloatingCart;
