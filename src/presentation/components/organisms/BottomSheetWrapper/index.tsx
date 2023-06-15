import {
  Column,
  IconButton,
  ModalBottomSheet,
  ReanimatedColumn,
  Row,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {forwardRef, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetWrapperProps} from './BottomSheetWrapper.types';

const BACKDROP_SIZE = 70;

const BottomSheetWrapper = forwardRef(
  (
    props: BottomSheetWrapperProps,
    ref: React.Ref<BottomSheetModalMethods> | undefined,
  ) => {
    const {
      onClose,
      title,
      showCloseButton,
      headerComponent,
      headerStyle,
      onDismiss,
      children,
    } = props;
    const {height: screenHeight} = useWindowDimensions();
    const {top} = useSafeAreaInsets();

    const snapPoints = useMemo(() => {
      return [screenHeight - BACKDROP_SIZE - top];
    }, [screenHeight, top]);

    return (
      <ModalBottomSheet
        ref={ref}
        snapPoints={snapPoints}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        topInset={BACKDROP_SIZE}
        onDismiss={onDismiss}>
        <ReanimatedColumn contentStyle="fitContent" style={headerStyle}>
          <Row arrangement="between" padding={{h: Spacing.High}}>
            <Column>
              <Text type="b1" text={title} />
            </Column>

            {showCloseButton && (
              <IconButton
                onPress={onClose}
                size={24}
                backgroundColor={Theme.Neutral02}
                borderRadius={12}
                iconProps={{name: 'Close', size: 20}}
              />
            )}
          </Row>

          <Spacer length={Spacing.Standard} />

          {headerComponent}
        </ReanimatedColumn>

        <Column>{children}</Column>
      </ModalBottomSheet>
    );
  },
);

export default BottomSheetWrapper;
