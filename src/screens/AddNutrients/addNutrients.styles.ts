import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';
import {center} from '@shopify/react-native-skia';

const styles = StyleSheet.create({
  container: {
    paddingTop: vS(15),
    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollWrapper: {
    paddingHorizontal: hS(15),
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colours.gray,
    paddingVertical: vS(5),
  },
  topWrapper: {
    flexDirection: 'row',
    paddingHorizontal: hS(15),
    alignItems: 'center',
  },
  // imgWrapper: {
  //   height: vS(75),
  //   width: hS(70),
  //   borderWidth: 1,
  //   borderColor: Colours.gray,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  name: {
    fontFamily: Fonts.bold,
    fontSize: mS(17),
    color: Colours.black,
  },
  serving: {
    fontFamily: Fonts.regular,
    fontSize: mS(14),
    color: Colours.black,
  },
  foodImg: {
    height: vS(60),
    aspectRatio: 1,
    width: hS(56),
  },
  paramsWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: hS(13),
  },
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
  input: {
    width: '50%',
    backgroundColor: Colours.white,
    paddingHorizontal: 0,
    height: vS(40),
  },
});

export default styles;
