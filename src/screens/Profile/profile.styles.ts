import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, mS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.green,
    flex: 1,
  },
  header: {
    height: vS(62),
    backgroundColor: Colours.green,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(22),
    color: Colours.white,
  },
  save: {
    fontFamily: Fonts.semiBold,
    fontSize: hS(15),
    color: Colours.white,
  },
  btnSave: {
    position: 'absolute',
    right: hS(20),
    bottom: vS(22),
  },
  scrollWrapper: {
    padding: mS(10),
    rowGap: vS(15),
    backgroundColor: Colours.lightGray,
    flex: 1,
  },
  sectionWrapper: {
    marginTop: vS(15),
    rowGap: vS(14),
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: hS(10),
    flexDirection: 'column',
  },
  iconWrapper: {
    flexDirection: 'row',
    columnGap: hS(10),
    alignItems: 'center',
  },
  iconLabel: {
    fontFamily: Fonts.bold,
    fontSize: mS(17),
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(20),
  },
  sectionTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(17),
    color: Colours.blue,
  },
  input: {
    height: vS(30),
    width: hS(110),
    backgroundColor: Colours.white,
  },
  btn: {color: Colours.darkRed},
  btnWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: hS(20),
    bottom: vS(22),
  },
  btnCancel: {
    marginHorizontal: 5,
    fontFamily: Fonts.semiBold,
    fontSize: hS(15),
    color: Colours.white,
  },
});

export default styles;
