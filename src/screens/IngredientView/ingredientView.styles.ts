import {StyleSheet} from 'react-native';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  img: {
    width: '100%',
    height: vS(250),
    resizeMode: 'stretch',
  },
  foodName: {
    position: 'absolute',
    bottom: vS(20),
    left: hS(15),
    fontFamily: Fonts.semiBold,
    fontSize: mS(35),
    color: Colours.white,
    textTransform: 'capitalize',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vS(15),
    justifyContent: 'space-between',
    paddingHorizontal: hS(25),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servUnit: {
    color: Colours.blue,
  },
  input: {
    width: hS(80),
    backgroundColor: Colours.white,
    paddingHorizontal: 0,
    height: vS(43),
    textAlign: 'center',
    color: Colours.blue,
    fontSize: mS(20),
  },
  cals: {
    fontSize: mS(15),
  },
  calories: {
    color: Colours.green,
    fontFamily: Fonts.semiBold,
    fontSize: mS(30),
    paddingRight: hS(10),
  },
  originalServ: {
    fontFamily: Fonts.regular,
    marginLeft: hS(25),
    marginTop: vS(-5),
    marginBottom: vS(10),
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colours.gray,
    paddingVertical: vS(5),
  },
  foodMacroWrapper: {
    marginTop: vS(20),
    paddingHorizontal: hS(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroTitle: {
    fontFamily: Fonts.bold,
    fontSize: mS(20),
    marginBottom: vS(15),
  },
  macrosRight: {
    paddingRight: hS(10),
    rowGap: vS(5),
  },
  macrosTxt: {
    fontFamily: Fonts.bold,
    fontSize: mS(18),
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
});

export default styles;
