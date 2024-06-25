import {StyleSheet} from 'react-native';
import {hS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    rowGap: 10,
    backgroundColor: Colours.white,
  },
  search: {
    marginHorizontal: hS(5),
    marginBottom: hS(15),
    borderRadius: 50,
  },
  searchWrapper: {
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
