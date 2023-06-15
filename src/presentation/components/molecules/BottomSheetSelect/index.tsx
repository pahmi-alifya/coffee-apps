import {
  Column,
  ModalBottomSheet,
  Row,
  RectButton,
  Text,
  IconButton,
  Theme,
  Separator,
  TextButton,
  Layout,
  Spacing,
} from '@atoms';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import styles from './BottomSheetSelect.style';
import BottomSheetSelectProps from './BottomSheetSelect.type';

const BottomSheetSelect: React.FC<BottomSheetSelectProps> = ({
  value,
  title = '',
  confirmButtonText = '',
  triggerElement = null,
  rectButtonProps = {},
  selections = [],
  onConfirm,
}) => {
  const [activeKey, setActiveKey] = useState('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenBottomSheet = () => {
    setActiveKey(value);
    bottomSheetRef?.current?.present();
  };
  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm(activeKey);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <RectButton onPress={handleOpenBottomSheet} {...rectButtonProps}>
        {triggerElement}
      </RectButton>
      <ModalBottomSheet
        ref={bottomSheetRef}
        snapPoints={[Math.round(Dimensions.get('screen').height / 2)]}>
        <Row
          arrangement="between"
          padding={{h: Spacing.High, b: Spacing.Standard}}>
          <Text>{title}</Text>
          <IconButton
            backgroundColor={Theme.Neutral02}
            iconProps={{
              name: 'Close',
            }}
            onPress={handleCloseBottomSheet}
          />
        </Row>
        <Separator height={4} backgroundColor={Theme.Neutral02} />
        <BottomSheetScrollView>
          <Column margin={{h: Spacing.High}}>
            {selections.map((selection, index) => (
              <Layout key={selection.key}>
                <RectButton
                  onPress={() => {
                    setActiveKey(selection.key);
                  }}
                  padding={{v: Spacing.Standard}}
                  arrangement="between">
                  {selection.content}
                  <View
                    style={[
                      styles.radioButtonContainer,
                      activeKey === selection.key && styles.activeRadioButton,
                      activeKey !== selection.key && styles.inactiveRadioButton,
                    ]}>
                    <View
                      style={[
                        activeKey === selection.key &&
                          styles.radioButtonActiveContent,
                      ]}
                    />
                  </View>
                </RectButton>
                {index !== selections.length - 1 && <Separator />}
              </Layout>
            ))}
          </Column>
        </BottomSheetScrollView>
        <Separator height={4} backgroundColor={Theme.Neutral02} />
        <Column contentStyle="fitContent" margin={Spacing.High}>
          <TextButton
            textProps={{
              type: 'b1',
              color: Theme.Neutral01,
              children: confirmButtonText,
            }}
            backgroundColor={Theme.Red206}
            padding={{v: Spacing.Small}}
            borderRadius={32}
            onPress={handleConfirm}
          />
        </Column>
      </ModalBottomSheet>
    </>
  );
};

export default BottomSheetSelect;
