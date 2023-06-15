import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Layout, Text, Theme} from '@atoms';
import PinStyle from './PinView.style';
import {range} from '@utils';

interface Props {
  length: number;
  type: 'underline' | 'circle';
  isValid: boolean;
  onFinish: (value: string) => void;
}

const PinView: React.FC<Props> = (props) => {
  const {length, onFinish, type = 'circle', isValid = true} = props;
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState<string>('');

  const isCircle = type === 'circle';

  const setKeyboard = () => {
    inputRef?.current?.focus();
  };

  const elementStyle = isCircle
    ? PinStyle.pinElement
    : PinStyle.underlineElement;
  const valueStyle = isCircle
    ? PinStyle.activePinElement
    : PinStyle.activeUnderlineElement;

  useEffect(() => {
    if (code.length === length) {
      onFinish(code);
    }
  }, [code]);

  useEffect(() => {
    if (isValid) {
      setCode('');
    }
  }, [isValid]);

  useEffect(() => {
    setKeyboard();
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={setKeyboard}>
        <Layout style={{flexDirection: 'row'}}>
          {range(length).map((value, index) =>
            isCircle ? (
              <View
                key={index}
                style={{
                  ...elementStyle,
                  ...(code && index < code.length && valueStyle),
                }}
              />
            ) : (
              <View
                key={index}
                style={{
                  ...elementStyle,
                  ...(code && index < code.length && valueStyle),
                }}>
                <Text
                  weight="bold"
                  text={code[index]}
                  type="h2"
                  style={{textAlign: 'center'}}
                  color={Theme.Neutral10}
                />
              </View>
            ),
          )}
        </Layout>
      </TouchableWithoutFeedback>
      <TextInput
        ref={inputRef}
        autoFocus
        keyboardType="number-pad"
        maxLength={length}
        value={code}
        onChangeText={setCode}
        style={PinStyle.invisible}
      />

      {code.length >= length && !isValid && isCircle && (
        <Text weight="bold" text="Invalid PIN" type="l1" color={Theme.Red206} />
      )}
    </>
  );
};

export default PinView;
