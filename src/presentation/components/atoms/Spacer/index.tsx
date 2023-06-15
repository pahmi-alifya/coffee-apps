import React from 'react';
import {Column} from '../Container';
import {LayoutSpacerProps} from './Spacer.types';

/**
 * Use Spacer to display a space/padding vertically or horizontally.
 * @param param0 length, horizontal = should the Spacer span horizontally?
 * @returns
 */
const Spacer: React.FC<LayoutSpacerProps> = ({length, horizontal}) => {
  if (horizontal) {
    return <Column width={length} height="100%" />;
  }

  return <Column height={length} />;
};

export default Spacer;
