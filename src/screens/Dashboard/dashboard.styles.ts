import {StyleSheet} from 'react-native';
import {Colours} from '@constants';
import {mS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollViewWrapper: {
    padding: mS(15),
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
