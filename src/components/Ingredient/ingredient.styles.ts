import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    columnGap: hS(10),
    alignItems: 'center',
  },
  img: {
    width: hS(45),
    height: vS(40),
    borderRadius: 5,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: mS(19),
    color: Colours.darkGray,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(16),
  },
});

export default styles;
