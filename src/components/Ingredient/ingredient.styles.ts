import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Fonts} from '@constants';

const styles = StyleSheet.create({
  wrapper: {
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
    fontSize: mS(18),
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(16),
  },
});

export default styles;
