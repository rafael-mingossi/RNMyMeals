import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {backgroundColor: Colours.white, flexGrow: 1},
  banner: {
    width: '100%',
    // height: 400,
  },
  foodName: {
    position: 'absolute',
    bottom: vS(20),
    left: hS(15),
    fontFamily: Fonts.semiBold,
    fontSize: mS(30),
    color: Colours.white,
    textTransform: 'capitalize',
  },
  bellowBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colours.white,
    marginTop: vS(15),
  },
  singleInfo: {
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colours.gray,
    paddingVertical: vS(5),
  },
  serving: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(27),
    color: Colours.blue,
  },
  calories: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(23),
    color: Colours.green,
  },
  bottomText: {
    fontFamily: Fonts.regular,
    fontSize: mS(15),
  },
  ingredients: {
    paddingHorizontal: hS(17),
    paddingVertical: vS(15),
  },
  header: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(18),
  },
  icon: {width: hS(25), height: vS(25), aspectRatio: 1},
  flatListItem: {
    fontFamily: Fonts.semiBold,
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
