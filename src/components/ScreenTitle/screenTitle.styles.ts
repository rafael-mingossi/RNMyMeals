import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {mS, vS} from '@utils';

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(30),
    color: Colours.black,
    textAlign: 'center',
    marginBottom: vS(20),
  },
});

export default styles;
