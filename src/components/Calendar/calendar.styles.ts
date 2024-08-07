import {StyleSheet} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS, mS, vS} from '@utils';

const styles = StyleSheet.create({
  calendarContainer: {
    // flex: 1,
    backgroundColor: Colours.white,
  },
  selectedDay: {
    backgroundColor: Colours.green,
    borderRadius: 100,
    color: Colours.black,
    width: hS(38),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayTxt: {
    color: Colours.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: mS(20),
    alignItems: 'center',
  },
  dayText: {
    color: Colours.black,
    marginHorizontal: hS(10),
    fontFamily: Fonts.black,
  },
  daysContainer: {
    padding: mS(15),
  },
  headerText: {
    fontSize: hS(17),
    fontFamily: Fonts.semiBold,
  },
  selected: {
    backgroundColor: Colours.green,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textSelected: {
    color: Colours.white,
    fontWeight: 'bold',
  },
  nonSelected: {
    padding: mS(7),
  },
  monthsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mS(20),
    justifyContent: 'center',
  },
  singleMonth: {
    padding: mS(7),
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Set outer view opacity
  },
  innerView: {
    backgroundColor: Colours.white, // No opacity for inner view
    padding: mS(20),
    borderRadius: 10,
    width: '87%',
  },
  bottomModalButtons: {
    marginTop: vS(25),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    backgroundColor: Colours.green,
    borderRadius: 7,
    padding: mS(7),
  },
  buttonCancel: {
    borderRadius: 7,
    padding: mS(7),
    backgroundColor: Colours.darkRed,
  },
  modalBtnTxt: {
    color: Colours.white,
    fontFamily: Fonts.semiBold,
  },
  flatListStyles: {
    justifyContent: 'center',
    backgroundColor: Colours.white,
    paddingVertical: vS(10),
    paddingHorizontal: hS(10),
    alignItems: 'center',
    borderTopColor: Colours.gray,
    borderTopWidth: 1,
    borderBottomColor: Colours.gray,
    borderBottomWidth: 1,
  },
  flatList: {
    backgroundColor: Colours.white,
    flexGrow: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
