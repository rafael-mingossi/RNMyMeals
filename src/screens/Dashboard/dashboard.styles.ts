import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {mS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollViewWrapper: {
    padding: mS(10),
    rowGap: vS(15),
    backgroundColor: Colours.lightGray,
    flex: 1,
  },
  mealTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(18),
  },
  mealRowWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: vS(10),
  },
  singleMealWrapper: {
    alignItems: 'center',
  },
  mealValueTxt: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(18),
    color: Colours.blue,
  },
});

export default styles;
