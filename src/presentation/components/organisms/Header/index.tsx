/**
 *  Components Header organisms
 *  This code will do Create header for pages by type
 */

// ! Import react module and library first on top of tsx file.
import React from 'react';

// Import custom module of components

// Import styling and types of module you created
import BackableHeader from './Backable/BackableHeader';
import Default from './Default';
import HeaderProps from './Header.types';
import Modal from './Modal';

const Components = {
  modal: Modal,
  page: Default,
  default: Default,
  backable: BackableHeader,
};

/**
 * Init Header organisms
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
const Header = (props: HeaderProps) => {
  const {variant = 'default', ...rest} = props;
  const Component = Components[variant];
  return <Component {...rest} />;
};

// Export Header component as default
export default Header;
