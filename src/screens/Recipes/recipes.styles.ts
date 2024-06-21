import {StyleSheet} from 'react-native';
import {hS} from '@utils';
import {Colours} from '@constants';

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
});

export default styles;
