import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useMemo, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IconButton, ReanimatedRectButton} from '../Button';
import {RectButtonProps} from '../Button/RectButton';
import {Theme} from '../Color';
import {ReanimatedRow} from '../Container';
import {ContainerConfigProps} from '../Container/Container.types';
import {Spacing} from '../Spacing';
import {TextStyleType, TextStyleWeight} from '../Text/Text.style';
import TextInputStyle from './TextInput.style';
import {TextInputProps} from './TextInput.types';

const ReanimatedRNTextInput = Reanimated.createAnimatedComponent(RNTextInput);

const TextInputComponent = {
  bottomSheet: BottomSheetTextInput,
  animated: ReanimatedRNTextInput,
  default: RNTextInput,
};

const DEFAULT_HEIGHT = 38;
const DEFAULT_FOCUS_DURATION = 300;
const DEFAULT_BLUR_DURATION = 200;
const DEFAULT_BORDER_RADIUS = 24;

const TextInput = forwardRef((props: TextInputProps, ref) => {
  const {
    type = 'default',
    containerProps,
    prefixComponent,
    suffixComponent,
    onFocus,
    onBlur,
    allowClear,
    style,
    defaultValue,
    onChangeText,
    onPress,
    ...rest
  } = props;
  const Component = TextInputComponent[type];
  const height = containerProps?.height || DEFAULT_HEIGHT;
  const focused = useSharedValue(0);
  const textInputRef = useRef<RNTextInput>(null);
  const [value, setValue] = useState(defaultValue);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focused.value = withTiming(1, {duration: DEFAULT_FOCUS_DURATION});
      if (onFocus) onFocus(e);
    },
    [focused, onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focused.value = withTiming(0, {duration: DEFAULT_BLUR_DURATION});
      if (onBlur) onBlur(e);
    },
    [focused, onBlur],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setValue(text);
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  const handleClear = useCallback(() => {
    setValue('');
    textInputRef.current?.clear();
    textInputRef.current?.focus();
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focused.value,
      [0, 1],
      [Theme.Neutral04, Theme.Red206],
      'RGB',
    );

    return {
      borderWidth: 1,
      borderColor,
      height,
      borderRadius: DEFAULT_BORDER_RADIUS,
      overflow: 'hidden',
      paddingHorizontal: Spacing.Standard,
    };
  });

  const renderMainComponent = useMemo(
    () => (
      <Component
        ref={textInputRef}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={Theme.Neutral05}
        style={[
          TextInputStyle.defaultStyle,
          TextStyleWeight.regular,
          TextStyleType.b2,
          {height},
          style,
        ]}
        cursorColor={Theme.Neutral10}
        {...rest}
      />
    ),
    [
      Component,
      handleBlur,
      handleChangeText,
      handleFocus,
      height,
      rest,
      style,
      value,
    ],
  );

  const renderSuffixComponent = useMemo(() => {
    if (allowClear && !!value) {
      return (
        <IconButton
          onPress={handleClear}
          size={22}
          backgroundColor={Theme.Neutral04}
          borderRadius={12}
          iconProps={{name: 'Close'}}
        />
      );
    }

    return suffixComponent;
  }, [allowClear, handleClear, suffixComponent, value]);

  if (onPress) {
    return (
      <ReanimatedRectButton
        onPress={onPress}
        style={animatedContainerStyle}
        {...(containerProps as RectButtonProps)}>
        {prefixComponent}
        {renderMainComponent}
        {renderSuffixComponent}
      </ReanimatedRectButton>
    );
  }

  return (
    <ReanimatedRow
      style={animatedContainerStyle}
      {...(containerProps as ContainerConfigProps)}>
      {prefixComponent}
      {renderMainComponent}
      {renderSuffixComponent}
    </ReanimatedRow>
  );
});

export default TextInput;
