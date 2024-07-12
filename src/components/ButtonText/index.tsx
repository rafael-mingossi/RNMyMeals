import React, {FC, PropsWithChildren} from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import styles from './buttonText.styles.ts';

type ButtonTextProps = {
  children: PropsWithChildren;
} & ButtonProps;

const ButtonText: FC<ButtonTextProps> = ({children, disabled, ...rest}) => {
  return (
    <Button
      {...rest}
      mode="text"
      labelStyle={[styles.btnLabel, disabled ? styles.disabledStyle : null]}
      disabled={disabled}
      ///INLINE STYLE ADDED TO FIX WARNING => ADVICE View #3939 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
      style={disabled ? {elevation: 0} : undefined}
      uppercase={false}>
      {children}
    </Button>
  );
};

export default ButtonText;
