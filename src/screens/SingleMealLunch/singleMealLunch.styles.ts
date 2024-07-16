import {StyleSheet} from 'react-native';
import {Colours} from '@constants';
import {hS, mS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  scrollView: {
    paddingHorizontal: hS(10),
    paddingVertical: vS(10),
    rowGap: vS(15),
  },
  surface: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: mS(17),
    rowGap: vS(8),
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
