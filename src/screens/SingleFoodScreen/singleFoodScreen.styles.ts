import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
  },
  innerWrapper: {
    alignItems: 'center',
    paddingHorizontal: hS(10),
    paddingVertical: vS(20),
  },
  image: {
    width: hS(200),
    // height: vS(200),
    borderRadius: 5,
    // resizeMode: 'contain',
    // objectFit: 'scale-down',
    aspectRatio: 1,
  },
  imageNo: {
    width: hS(150),
    height: vS(150),
    borderRadius: 5,
    aspectRatio: 1,
  },
  detailsWrapper: {
    alignItems: 'center',
    marginTop: vS(15),
  },
  foodName: {
    fontFamily: Fonts.bold,
    fontSize: hS(25),
  },
  calories: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(17),
    marginTop: vS(5),
  },
  serv: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(15),
    marginBottom: vS(15),
  },
  row: {
    flexDirection: 'row',
    columnGap: hS(15),
  },
  macros: {
    fontFamily: Fonts.regular,
    fontSize: mS(15),
    paddingVertical: vS(3),
    fontWeight: 'bold',
  },
  macrosReg: {
    fontFamily: Fonts.regular,
    fontSize: mS(15),
    fontWeight: 'normal',
  },
  footer: {
    marginTop: vS(20),
  },
  button: {},
  footerText: {},
});

export default styles;
