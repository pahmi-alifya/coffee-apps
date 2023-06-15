import React, {useState} from 'react';
import {BorderlessButton, Box, Icon, Row, Spacing, Theme} from '@atoms';
import {ContainerConfigProps} from '@atoms/Container/Container.types';
import {TextInput} from 'react-native';
import SearchBarStyle from './SearhBar.style';
import {IconProps} from '@atoms/Icon/Icon.types';

interface SearchBarProps extends ContainerConfigProps {
  iconProps?: IconProps;
  value: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onPressClose: () => void;
  onChangeText: (value: string) => void;
}
const SearchBar = (props: SearchBarProps) => {
  const {
    iconProps = {name: 'Search', size: 20},
    value,
    placeholder,
    placeholderTextColor,
    onChangeText,
    onPressClose,
    style,
    ...rest
  } = props;
  const [focus, setFocus] = useState(false);
  return (
    <Row
      borderRadius={19}
      style={[
        SearchBarStyle.borderSearch,
        focus && SearchBarStyle.borderActive,
        style,
      ]}
      height={38}
      {...rest}>
      <Box width={22} left={Spacing.Standard}>
        <Icon {...iconProps} />
      </Box>
      <TextInput
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        value={value}
        onChangeText={onChangeText}
        style={SearchBarStyle.searchBar}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {value && (
        <Box width={22} right={Spacing.Standard}>
          <BorderlessButton
            onPress={onPressClose}
            size={22}
            backgroundColor={Theme.Neutral03}>
            <Icon name="Close" size={14} />
          </BorderlessButton>
        </Box>
      )}
    </Row>
  );
};

export default SearchBar;
