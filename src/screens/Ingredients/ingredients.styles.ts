import {StyleSheet} from 'react-native';
import {hS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    rowGap: 10,
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
