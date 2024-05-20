import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  input: {
    // borderBottomWidth: 0.5,
    backgroundColor: 'white',
    // borderColor: Colours.brown,
    marginBottom: 10,
  },
  leftIcon: {
    color: Colours.gray,
  },
  label: {
    fontFamily: Fonts.bold,
  },
  un: {
    color: 'red',
  },
});

export default styles;
