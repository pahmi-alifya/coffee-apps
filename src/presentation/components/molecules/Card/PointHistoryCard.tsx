import {Column, Row, Spacing, Text, Theme} from '@atoms';
import {JiwaPointTransactionType} from '@models';
import React from 'react';
import {useTranslation} from 'react-i18next';

interface Props {
  item: JiwaPointTransactionType;
  isUsedPoint?: boolean;
}

const PointHistoryCard: React.FC<Props> = ({item, isUsedPoint}) => {
  const {t} = useTranslation();

  return (
    <Column padding={{h: Spacing.High}}>
      <Row margin={{b: Spacing.Tiny}}>
        <Text type="l2" weight="regular" color={Theme.Neutral05}>
          {item.createdAt}
        </Text>

        <Column alignment="end">
          <Text type="l1" weight="bold">
            {`${isUsedPoint ? '-' : '+'}${item.transaction_amount} ${t(
              'pointHistory.plusPoint',
            )}`}
          </Text>
        </Column>
      </Row>

      <Text type="l1" weight="medium">
        {item.transaction_activity}
      </Text>

      {!!item.expiry_date && (
        <Text type="l2" weight="regular" style={{marginTop: Spacing.Tiny}}>
          {item.expiry_date}
        </Text>
      )}
    </Column>
  );
};

export default PointHistoryCard;
