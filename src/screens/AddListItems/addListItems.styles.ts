import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, mS, vS} from '@utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.green,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  search: {
    marginHorizontal: hS(20),
    marginVertical: hS(15),
    borderRadius: 50,
  },
  searchWrapper: {
    backgroundColor: Colours.green,
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
    backgroundColor: Colours.white,
    // marginBottom: vS(30),
  },
  cartBtn: {
    position: 'absolute',
    right: hS(10),
    bottom: vS(80),
    backgroundColor: Colours.green,
    padding: mS(3),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  carTxt: {
    position: 'absolute',
    color: Colours.white,
    fontFamily: Fonts.semiBold,
  },
  wrapperBottomSheet: {backgroundColor: Colours.white},

  contentContainer: {
    backgroundColor: Colours.white,
    justifyContent: 'space-between',
  },
  imgTxtWrapper: {
    flexDirection: 'row',
    paddingHorizontal: hS(20),
    paddingVertical: vS(10),

    justifyContent: 'space-between',
  },
  imgAndText: {
    columnGap: hS(10),
    flexDirection: 'row',
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
});

export default styles;
