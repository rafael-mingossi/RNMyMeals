import {Dimensions, StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    paddingHorizontal: hS(30),
    paddingTop: vS(10),
    paddingBottom: vS(40),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: hS(20),
    backgroundColor: Colours.white,
  },
  wrapper: {backgroundColor: Colours.white},
  bottomIcons: {
    marginBottom: vS(45),
    flexDirection: 'row',
    columnGap: hS(20),
  },
  bottomSheetTitle: {
    fontSize: hS(18),
    fontFamily: Fonts.medium,
    alignSelf: 'center',
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: Colours.black,
    backgroundColor: Colours.white,
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
    aspectRatio: 1,
    height: '100%',
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.green,
    aspectRatio: 1,
    // height: Dimensions.get('window').width * vS(0.158),
    width: Dimensions.get('window').width * hS(0.158),
    top: vS(-25),
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
