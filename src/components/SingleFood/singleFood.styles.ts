import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: hS(20),
    paddingVertical: vS(10),
    gap: mS(10),
  },
  img: {
    width: hS(55),
    height: vS(50),
    borderRadius: 5,
  },
  textWrapper: {flexDirection: 'column'},
  checkBox: {
    width: hS(35),
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: hS(14),
  },
  icons: {
    marginLeft: 'auto',
    flexDirection: 'row',
    columnGap: hS(8),
  },
});

export default styles;
