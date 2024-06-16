import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, vS} from '@utils';

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: hS(16),
    color: Colours.black,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  labelG: {
    fontFamily: Fonts.bold,
    fontSize: hS(14),
    color: Colours.black,
    marginLeft: hS(10),
    width: hS(28),
  },
  input: {
    width: '50%',
    backgroundColor: Colours.white,
    paddingHorizontal: 0,
    height: vS(43),
    textAlign: 'center',
  },
});

export default styles;
