import {StyleSheet} from 'react-native';
import {hS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: hS(16),
    fontFamily: Fonts.bold,
    color: Colours.blue,
  },
  disabledStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
