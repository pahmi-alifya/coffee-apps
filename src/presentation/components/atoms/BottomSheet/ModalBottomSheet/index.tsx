import {Theme} from '@atoms/Color';
import {Spacing} from '@atoms/Spacing';
import {BottomSheetModal, BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useAndroidBackHandler} from '@hooks/useAndroidBackHandler';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
import React, {forwardRef, useState} from 'react';
import Backdrop from '../Backdrop';
import {useNavigation} from '@react-navigation/native';

const ModalBottomSheet = forwardRef((props: BottomSheetModalProps, ref) => {
  const {children, ...rest} = props;
  const combinedRef = useCombinedRefs<BottomSheetModalMethods>(ref);
  const navigation = useNavigation();
  const [isShowing, setIsShowing] = useState(false);

  useAndroidBackHandler(() => {
    if (isShowing) {
      combinedRef.current?.dismiss();
      return true;
    }

    navigation.goBack();
    return true;
  });

  return (
    <BottomSheetModal
      ref={combinedRef}
      backdropComponent={Backdrop}
      backgroundStyle={{
        borderTopLeftRadius: Spacing.High,
        borderTopRightRadius: Spacing.High,
      }}
      handleIndicatorStyle={{
        backgroundColor: Theme.Neutral04,
        width: Spacing.Extra,
        height: Spacing.SuperTiny,
      }}
      onChange={(index) => setIsShowing(index >= 0)}
      {...rest}>
      {children}
    </BottomSheetModal>
  );
});

export default ModalBottomSheet;
