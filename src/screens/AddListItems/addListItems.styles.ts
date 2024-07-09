import {StyleSheet} from 'react-native';
import {Colours} from '@constants';
import {hS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.green,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  search: {
    marginHorizontal: hS(20),
    marginVertical: hS(15),
    borderRadius: 50,
  },
  searchWrapper: {
    backgroundColor: Colours.green,
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
    backgroundColor: Colours.white,
  },
});

export default styles;
