import { Column, Image, Spacer, Spacing, Text } from '@atoms';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  title: string;
  desc: string;
  image: any
}

const NotificationInfoEmptyPlaceholder: React.FC<Props> = ({ title, desc, image }) => {
  return (
    <Column margin={{ t: Spacing.High }}>
      <Image
        source={image}
        resizeMode="contain"
        style={styles.image}
      />

      <Text type="b1" weight="bold" align="center">
        {title}
      </Text>

      <Spacer length={Spacing.SuperTiny} />

      <Column padding={{ h: Spacing.High }} alignment="center">
        <Text type="l1" weight="regular" align="center" style={{ maxWidth: 327 }}>
          {desc}
        </Text>
      </Column>
    </Column>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: Spacing.High,
  },
});

export default NotificationInfoEmptyPlaceholder;
