import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, vS} from '@utils';

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeTxt: {
    color: Colours.white,
    fontSize: hS(23),
    fontFamily: Fonts.semiBold,
  },
  wrapper: {
    alignItems: 'center',
  },
  brandWrapper: {
    flexDirection: 'row',
  },
  brandTxt: {
    fontFamily: Fonts.extraBold,
    fontSize: hS(40),
  },
  brandTxtTop: {
    fontSize: hS(40),
  },
  txtButtons: {
    color: Colours.white,
    marginTop: vS(15),
    marginBottom: vS(10),
    fontFamily: Fonts.regular,
    fontSize: hS(14),
  },
});

export default styles;
