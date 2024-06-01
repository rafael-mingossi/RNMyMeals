import {Dimensions, StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: mS(30),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    columnGap: hS(10),
    rowGap: vS(15),
  },
  wrapper: {},
  bottomSheetTitle: {
    fontSize: hS(18),
    fontFamily: Fonts.medium,
    alignSelf: 'center',
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: Colours.black,
    height: Dimensions.get('window').width * 0.18,
    width: Dimensions.get('window').width * 0.18,
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
    padding: mS(5),
    alignSelf: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.green,
    height: Dimensions.get('window').width * hS(0.18),
    width: Dimensions.get('window').width * hS(0.18),
    top: vS(-25),
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
    borderWidth: 6,
    borderColor: Colours.white,
  },
});

export default styles;
