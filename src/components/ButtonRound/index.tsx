import React, {FC, PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import styles from './buttonRound.styles.ts';
import {Button, ButtonProps} from 'react-native-paper';

type BtnRoundProps = {
  children: PropsWithChildren;
  btnColour: 'green' | 'white';
  icon?: string;
} & ButtonProps;

const ButtonRound: FC<BtnRoundProps> = ({
  children,
  icon,
  btnColour,
  ...rest
}) => {
  const colourVariants = {
    green: styles.green,
    white: styles.white,
  };
  return (
    <Button
      {...rest}
      icon={icon}
      mode="contained"
      style={[styles.container, colourVariants[btnColour]]}>
      <View>
        <Text style={[colourVariants[btnColour], styles.text]}>{children}</Text>
      </View>
    </Button>
  );
};

export default ButtonRound;
