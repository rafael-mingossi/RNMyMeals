import React, {FC, PropsWithChildren} from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import styles from './buttonText.styles.ts';

type ButtonTextProps = {
  children: PropsWithChildren;
} & ButtonProps;

const ButtonText: FC<ButtonTextProps> = ({children, ...rest}) => {
  return (
    <Button
      {...rest}
      mode="text"
      labelStyle={styles.btnLabel}
      uppercase={false}>
      {children}
    </Button>
  );
};

export default ButtonText;
