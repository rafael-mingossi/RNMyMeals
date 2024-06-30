import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Fonts} from '@constants';

const styles = StyleSheet.create({
  foodMacroWrapper: {
    marginTop: vS(20),
    paddingHorizontal: hS(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroTitle: {
    fontFamily: Fonts.bold,
    fontSize: mS(20),
    marginBottom: vS(15),
  },
  macrosRight: {
    paddingRight: hS(10),
    rowGap: vS(5),
  },
  macrosTxt: {
    fontFamily: Fonts.bold,
    fontSize: mS(18),
  },
});

export default styles;
