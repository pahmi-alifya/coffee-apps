import {BackableHeaderProps} from './Backable/BackableHeader';
import {DefaultProps} from './Default/Default.types';
import {ModalProps} from './Modal/Modal.types';

export type HeaderVariant = 'modal' | 'page' | 'default' | 'backable';
type HeaderProps = DefaultProps | ModalProps | BackableHeaderProps;

export default HeaderProps;
