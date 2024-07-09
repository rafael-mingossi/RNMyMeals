import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  padding: {
    paddingLeft: hS(20),
  },
  imgTxtWrapper: {
    flexDirection: 'row',
    paddingHorizontal: hS(20),
    paddingVertical: vS(10),
    columnGap: hS(10),
  },
  img: {
    width: hS(40),
    height: vS(35),
    borderRadius: 5,
  },
  textWrapper: {flexDirection: 'column'},
  checkBox: {
    width: hS(15),
  },
  textLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(16),
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: hS(14),
    color: Colours.green,
  },
});

export default styles;
