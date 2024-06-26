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
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colours.gray,
    paddingVertical: vS(5),
  },
  topWrapper: {
    flexDirection: 'row',
    paddingHorizontal: hS(15),
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: mS(17),
    color: Colours.black,
  },
  serving: {
    fontFamily: Fonts.regular,
    fontSize: mS(14),
    color: Colours.black,
  },
  foodImg: {
    height: vS(60),
    aspectRatio: 1,
    width: hS(56),
    borderRadius: 5,
  },
  paramsWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: hS(13),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: hS(16),
    color: Colours.black,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: hS(6),
    justifyContent: 'flex-end',
    flex: 1,
  },
  labelG: {
    fontFamily: Fonts.bold,
    fontSize: hS(14),
    color: Colours.black,
  },
  input: {
    width: '50%',
    backgroundColor: Colours.white,
    paddingHorizontal: 0,
    height: vS(40),
  },
});

export default styles;
