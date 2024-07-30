import {StyleSheet} from 'react-native';
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
  loadingView: {
    flex: 1,
    backgroundColor: Colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgTxtWrapper: {
    flexDirection: 'row',
    paddingVertical: vS(5),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteSelected: {
    backgroundColor: Colours.lightRed,
  },
  imgAndText: {
    columnGap: hS(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: hS(40),
    height: vS(35),
    borderRadius: 5,
  },
  textWrapper: {flexDirection: 'column'},
  textLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(16),
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: hS(14),
    color: Colours.green,
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hS(5),
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(55),
    backgroundColor: Colours.lightGray,
    // marginBottom: vS(30),
  },
});

export default styles;
