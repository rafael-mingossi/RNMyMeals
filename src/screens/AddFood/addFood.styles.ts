import {StyleSheet} from 'react-native';
import {hS, vS} from '@utils';
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
  subLabel: {
    fontSize: hS(11),
    marginLeft: hS(10),
    marginTop: vS(5),
    color: Colours.gray,
    marginBottom: vS(10),
  },
  modalText: {
    fontFamily: Fonts.regular,
    fontSize: hS(15),
    color: Colours.black,
  },
  closeModalBtn: {
    marginTop: vS(15),
    marginLeft: 'auto',
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
