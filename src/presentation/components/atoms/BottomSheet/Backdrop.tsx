import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React from 'react';

interface Props extends BottomSheetBackdropProps {}

const Backdrop: React.FC<Props> = (props) => {
  return (
    <BottomSheetBackdrop
      disappearsOnIndex={-1}
      appearsOnIndex={1}
      opacity={0.7}
      pressBehavior="close"
      {...props}
    />
  );
};

export default Backdrop;
