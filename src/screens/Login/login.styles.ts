import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {vS} from '@utils';

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
});

export default styles;
