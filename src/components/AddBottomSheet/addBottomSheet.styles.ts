import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mS(24),
    backgroundColor: Colours.gray,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: hS(50),
  },
  bottomSheetTitle: {
    fontSize: hS(24),
    fontWeight: '500',
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16247d',
    width: hS(50),
    height: vS(50),
    top: -15,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#f2f2f2',
  },
});

export default styles;
