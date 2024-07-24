import {Dimensions, StyleSheet} from 'react-native';
import {Colours} from '@constants';
import {mS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollViewWrapper: {
    padding: mS(15),
  },
});

export default styles;
