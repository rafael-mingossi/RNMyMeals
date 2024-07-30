import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  noResults: {
    backgroundColor: Colours.white,
    flex: 1,
    paddingHorizontal: hS(20),
    paddingVertical: hS(15),
  },
  noResultsTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(15),
  },
});

export default styles;
