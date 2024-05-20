import React, {forwardRef} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import styles from './textInputIcon.styles.ts';
import {Text, TextInput as TI, TextStyle} from 'react-native';
import {Colours} from '@constants';

type TextInputIconProps = {
  label: string;
  style?: TextStyle;
} & TextInputProps;

const TextInputIcon = forwardRef<TI, TextInputIconProps>(
  ({label, style, ...rest}, ref) => {
    const Label = <Text style={styles.label}>{label}</Text>;

    return (
      <TextInput
        {...rest}
        ref={ref}
        label={Label}
        style={[styles.input, style]}
        underlineColorAndroid={Colours.brown}
        underlineColor={Colours.brown}
        activeUnderlineColor={Colours.blue}
      />
    );
  },
);

export default TextInputIcon;
