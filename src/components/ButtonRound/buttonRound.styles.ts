import {StyleSheet} from 'react-native';
import {hS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    width: hS(230),
    paddingVertical: vS(4),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  green: {
    backgroundColor: Colours.green,
    color: Colours.white,
  },
  white: {
    backgroundColor: Colours.white,
    color: Colours.black,
  },
  text: {
    fontSize: hS(16),
    fontFamily: Fonts.bold,
  },
});

export default styles;
