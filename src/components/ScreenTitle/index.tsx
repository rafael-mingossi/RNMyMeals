import React, {FC} from 'react';
import {Text} from 'react-native';
import styles from './screenTitle.styles.ts';

type ScreenTitleProps = {
  title: string;
};

const ScreenTitle: FC<ScreenTitleProps> = ({title}) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default ScreenTitle;
