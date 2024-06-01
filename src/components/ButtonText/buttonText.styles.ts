import {StyleSheet} from 'react-native';
import {hS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: hS(16),
    fontFamily: Fonts.bold,
    color: Colours.blue,
  },
});

export default styles;
