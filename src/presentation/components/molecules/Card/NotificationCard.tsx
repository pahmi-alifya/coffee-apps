import {Column, RectButton, Row, Spacing, Text, Theme} from '@atoms';
import React from 'react';
import {NotificationType} from '@models';
import {TextStyle} from 'react-native';

interface Props {
  item: NotificationType;
}

type ColorType = {
  [key: string]: {
    text: string;
    background: string;
  };
};

const NotificationCard: React.FC<Props> = ({item}) => {
  const color: ColorType = {
    Transaksi: {
      text: Theme.Green06,
      background: Theme.Green01,
    },
    'Pengembalian Dana': {
      text: Theme.Yellow06,
      background: Theme.Yellow01,
    },
    Referral: {
      text: Theme.Orange06,
      background: Theme.Orange01,
    },
    Announcement: {
      text: Theme.Green06,
      background: Theme.Green01,
    },
  };

  // handling error when the type not match
  const textColor = color[item.notification_type]
    ? color[item.notification_type].text
    : Theme.Green06;
  const backgroundColor = color[item.notification_type]
    ? color[item.notification_type].background
    : Theme.Green01;

  const Chip = () => {
    const style = {
      ...stylesChip,
      backgroundColor,
    };

    return (
      <Text
        type="l1"
        color={textColor}
        style={style}
        text={item.notification_type}
      />
    );
  };

  return (
    <RectButton
      padding={{h: Spacing.High, v: Spacing.High}}
      backgroundColor={!item.is_read ? Theme.Gold01 : ''}>
      <Column>
        <Row margin={{b: Spacing.Tiny}} alignment="center">
          <Chip />
          <Column alignment="end">
            <Text type="l1" color={Theme.Neutral05}>
              {item.notification_datetime}
            </Text>
          </Column>
        </Row>
        <Text type="l1">{item.notification_title}</Text>
        <Text type="l1" color={Theme.Neutral05}>
          {item.notification_body}
        </Text>
      </Column>
    </RectButton>
  );
};

const stylesChip: TextStyle = {
  borderRadius: 32,
  paddingHorizontal: Spacing.Standard,
};

export default NotificationCard;
