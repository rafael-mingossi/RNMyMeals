import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: vS(15),
    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollWrapper: {
    paddingHorizontal: hS(15),
  },
  imgCameraWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: vS(15),
  },
  cameraImg: {
    width: hS(70),
    height: vS(70),
    borderRadius: 5,
    objectFit: 'contain',
  },
  prodName: {
    fontFamily: Fonts.regular,
    fontSize: mS(17),
    flex: 1,
  },
  regularTxt: {
    fontFamily: Fonts.regular,
    fontSize: mS(15),
  },
  blue: {color: Colours.blue, fontFamily: Fonts.semiBold},
  caloriesTxt: {
    fontFamily: Fonts.regular,
    fontSize: mS(22),
    paddingTop: vS(8),
    width: '50%',
  },
  caloriesValue: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(28),
    color: Colours.green,
    paddingTop: vS(4),
  },
  horizontalSpacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: vS(70),
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colours.lightGray,
    // paddingVertical: vS(5),
  },
  thickerLine: {
    borderBottomWidth: 3,
    borderColor: Colours.lightGray,
    paddingVertical: vS(5),
  },
  nutrientsWrapper: {},
  singleTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vS(7),
    paddingHorizontal: hS(10),
  },
  totalsTxtBold: {
    fontFamily: Fonts.medium,
  },
  valsTxt: {
    fontFamily: Fonts.regular,
    paddingRight: hS(10),
  },
});

export default styles;
