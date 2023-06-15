import {Column, RectButton, Spacer, Spacing, Text, Theme} from '@atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FallbackComponentProps} from '.';

interface Props extends FallbackComponentProps {}

const DefaultFallbackError: React.FC<Props> = ({
  error,
  onResetErrorBoundary,
}) => {
  const {t} = useTranslation();
  const errorMessage = error?.message || t('unknownError');

  return (
    <Column alignment="center">
      <Text align="center">{errorMessage}</Text>
      <Spacer length={Spacing.High} />
      <RectButton
        onPress={onResetErrorBoundary}
        borderRadius={Spacing.Tiny}
        height={42}
        width={200}
        backgroundColor={Theme.Red206}>
        <Text type="b1" color={Theme.Neutral01}>
          {t('tryAgain')}
        </Text>
      </RectButton>
    </Column>
  );
};

export default DefaultFallbackError;
