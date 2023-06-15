import {Column, Row, Spacing, Text} from '@atoms';
import {ButtonTagMenu} from '@molecules';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  label: string;
  options: Array<{value: number; name: string}>;
  onPress: (option: {value: number; name: string}) => void;
  selectedValue?: number | null;
}

const CustomiseMenuOptionField: React.FC<Props> = ({
  label,
  options,
  onPress,
  selectedValue,
}) => {
  return (
    <Row margin={{b: Spacing.Tiny}}>
      <Text type="b1" weight="bold" margin={{b: Spacing.Tiny, r: Spacing.Tiny}}>
        {label}
      </Text>

      <Column>
        <Row arrangement="trailing" style={styles.optionsContainer}>
          {options.map((option, index) => (
            <ButtonTagMenu
              key={`${option.value}-${index}`}
              label={option.name}
              isSelected={selectedValue === option.value}
              onPress={() => onPress(option)}
              style={{marginRight: Spacing.Tiny, marginBottom: Spacing.Tiny}}
            />
          ))}
        </Row>
      </Column>
    </Row>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexWrap: 'wrap',
  },
});

export default CustomiseMenuOptionField;
