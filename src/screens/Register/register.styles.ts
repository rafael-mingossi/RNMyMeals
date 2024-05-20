import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colours.white,
    rowGap: vS(15),
  },
  leftIcon: {
    color: Colours.gray,
  },
  backToLoginTxt: {
    alignSelf: 'center',
    color: Colours.green,
    textDecorationLine: 'underline',
  },
  label: {
    fontFamily: Fonts.bold,
  },

  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    columnGap: vS(9),
  },
  logo: {
    width: hS(45),
    aspectRatio: 1,
  },
  logoTxtWrapper: {
    flexDirection: 'row',
  },
  logoTxt1: {
    fontFamily: Fonts.regular,
    fontSize: hS(35),
    color: Colours.green,
  },
  logoTxt2: {
    fontFamily: Fonts.bold,
    color: Colours.greenDark,
  },
});

export default styles;
