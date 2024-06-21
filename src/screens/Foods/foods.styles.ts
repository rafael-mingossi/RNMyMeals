import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
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
  wrapper: {
    backgroundColor: 'white',
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
  loadingWrapper: {
    backgroundColor: Colours.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
