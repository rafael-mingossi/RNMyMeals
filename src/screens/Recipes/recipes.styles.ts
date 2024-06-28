import {StyleSheet} from 'react-native';
import {hS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.green,
    flex: 1,
  },
  search: {
    marginHorizontal: hS(20),
    marginVertical: hS(15),
    borderRadius: 50,
  },
  searchWrapper: {
    backgroundColor: Colours.green,
  },
  icon: {width: hS(35), height: vS(35), aspectRatio: 1},
  flatList: {
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
  flatListItem: {
    fontFamily: Fonts.semiBold,
  },
});

export default styles;
