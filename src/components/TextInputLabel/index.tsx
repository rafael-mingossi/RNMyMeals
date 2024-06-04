import React, {forwardRef} from 'react';
import styles from './textInputLabel.styles.ts';
import {Text, TextInput as TI, View} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {Colours} from '@constants';

type TextInputIconProps = {
  label: string;
  unit?: string;
  error?: boolean;
} & TextInputProps;

const TextInputLabel = forwardRef<TI, TextInputIconProps>(
  ({label, unit = 'g', error, ...rest}, ref) => {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.right}>
          <TextInput
            {...rest}
            ref={ref}
            mode={'flat'}
            enterKeyHint={'next'}
            style={styles.input}
            keyboardType={'numeric'}
            right={
              error ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
          />
          <Text style={styles.labelG}>{unit}</Text>
        </View>
      </View>
    );
  },
);

export default TextInputLabel;
