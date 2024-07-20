import {Dimensions, StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  iconAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: Colours.gray,
    backgroundColor: Colours.white,
    height: Dimensions.get('window').width * 0.12,
    width: Dimensions.get('window').width * 0.12,
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
    padding: mS(3),
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
  iconTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(18),
    marginLeft: hS(10),
    color: Colours.gray,
  },
  calValTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(24),
    color: Colours.green,
  },
  calsTxt: {color: Colours.green, fontFamily: Fonts.semiBold, fontSize: mS(16)},
  dayTotalsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(20),
    marginBottom: vS(10),
    color: Colours.black,
  },
  dayTotalsTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(16),
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
