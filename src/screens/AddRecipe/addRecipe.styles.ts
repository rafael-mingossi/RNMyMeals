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
    justifyContent: 'flex-start',
    paddingBottom: vS(15),
  },
  subLabel: {
    fontSize: mS(12),
    marginLeft: hS(10),
    marginTop: vS(5),
    color: Colours.gray,
    marginBottom: vS(10),
    fontFamily: Fonts.regular,
  },
  inputs: {
    marginLeft: hS(20),
  },
  extraMargin: {
    marginTop: vS(15),
  },
  line: {
    borderBottomWidth: 2,
    borderColor: Colours.lightGray,
    marginVertical: vS(10),
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: hS(16),
    color: Colours.black,
  },
  blockPadding: {
    paddingHorizontal: hS(15),
  },
  extraPadding: {
    marginBottom: vS(10),
  },
  singleTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vS(5),
    paddingHorizontal: hS(10),
  },
  totalsTxtBold: {
    fontFamily: Fonts.medium,
  },
  valsTxt: {
    fontFamily: Fonts.regular,
    paddingRight: hS(10),
  },
  ingredients: {
    flexDirection: 'row',
    paddingHorizontal: hS(10),
  },
});

export default styles;
