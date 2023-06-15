/**
 *  Drawer Auth
 *  This code will do Create Drawer Auth
 */

// ! Import react module and library first on top of tsx file.
import React, {forwardRef, memo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

// Import custom module of components
import {Theme, Layout, Text, TextButton, Column} from '@atoms';
import DeleteStyle from './index.style';
import {SvgDeleteAccount} from '@assets';

type Props = {
  snapPoints: string[];
  onPress: () => void;
};

const DrawerDelete = forwardRef<BottomSheet, Props>((props, ref) => {
  const {snapPoints, onPress} = props;
  const {t} = useTranslation();

  const handleCloseDrawer = () => {
    ref?.current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose>
      <BottomSheetScrollView>
        <SvgDeleteAccount width="100%" />
        <Layout style={DeleteStyle.text}>
          <Column alignment="center">
            <Text
              text={t('profile.detailProfile.deleteTitle')}
              type="b1"
              weight="bold"
            />
            <Text
              text={t('profile.detailProfile.deleteDescription')}
              style={{textAlign: 'center', paddingHorizontal: 20}}
              type="b2"
            />
          </Column>
        </Layout>
        <Layout style={DeleteStyle.buttonContainer}>
          <TextButton
            height={50}
            width={160}
            borderRadius={32}
            borderWidth={2}
            borderColor={Theme.Neutral08}
            onPress={handleCloseDrawer}
            textProps={{
              type: 'b1',
              color: Theme.Neutral10,
              text: t('profile.detailProfile.cancel'),
            }}
          />
          <TextButton
            height={50}
            width={160}
            borderRadius={32}
            backgroundColor={Theme.Red206}
            onPress={() => onPress()}
            textProps={{
              type: 'b1',
              color: Theme.Neutral01,
              text: t('profile.detailProfile.delete'),
            }}
          />
        </Layout>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
// Export Drawer Auth as default
export default memo(DrawerDelete);
