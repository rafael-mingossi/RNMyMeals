import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {Colours, Fonts} from '@constants';
import {vS, mS, hS} from '@utils';

dayjs.extend(localeData);

//// ICONS
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

type SingleDayList = {
  item: {date: dayjs.Dayjs};
  index: number;
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [lIndex, setLIndex] = useState(dayjs().date() - 1);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedMonthModal, setSelectedMonthModal] = useState(dayjs().month());

  const ref = useRef<FlatList>(null);

  const handlePrevDay = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'));
    if (lIndex === 0) {
      return;
    }
    setLIndex(lIndex - 1);
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.add(1, 'day'));
    if (lIndex === daysInMonth.length - 1) {
      return;
    }
    setLIndex(lIndex + 1);
  };

  const getDaysInMonth = (date: Dayjs) => {
    const days = [];

    // Add actual days in the month
    for (let i = 1; i <= date.daysInMonth(); i++) {
      days.push({date: dayjs(date).date(i)});
    }

    return days;
  };

  const renderWeekDay = (weekDay: number) => {
    switch (weekDay) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  };

  const renderMonthName = (month: number) => {
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  };

  const daysInMonth = getDaysInMonth(selectedDate);

  const renderDaysList = ({item, index}: SingleDayList) => {
    const dayShort = item.date;
    // const isSelected = dayShort?.isSame(selectedDate, 'day');
    return (
      <TouchableOpacity
        key={index}
        style={lIndex === index && styles.selectedDay}
        onPress={() => {
          setLIndex(index);
          setSelectedDate(dayShort);
        }}>
        <Text style={styles.dayText}>{dayShort?.date()}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    ref?.current?.scrollToIndex({
      index: lIndex,
      animated: true,
      viewOffset: 10,
      viewPosition: 0.5,
    });
  }, [lIndex]);

  const handleOnCloseModal = () => {
    setShowMonthModal(false);
  };

  const handleSelectMonth = (selected: number) => {
    setSelectedMonthModal(selected);
  };

  const handleModalConfirm = () => {
    setSelectedMonth(selectedMonthModal);
    handleOnCloseModal();
  };

  return (
    <View style={styles.calendarContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMonthModal}
        onRequestClose={handleOnCloseModal}>
        <Pressable style={styles.outerView} onPress={handleOnCloseModal}>
          <View style={styles.innerView}>
            <View style={styles.monthsList}>
              {dayjs
                .localeData()
                .monthsShort()
                .map((month, index) => (
                  <Pressable
                    style={[
                      index === selectedMonthModal && styles.selected,
                      styles.singleMonth,
                    ]}
                    key={index}
                    onPress={() => handleSelectMonth(index)}>
                    <Text
                      style={[
                        index === selectedMonthModal && styles.textSelected,
                        styles.nonSelected,
                      ]}>
                      {month}
                    </Text>
                  </Pressable>
                ))}
            </View>
            <View style={styles.bottomModalButtons}>
              <TouchableOpacity
                onPress={handleOnCloseModal}
                style={styles.buttonCancel}>
                <Text style={styles.modalBtnTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleModalConfirm()}
                style={styles.buttons}>
                <Text style={styles.modalBtnTxt}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevDay}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMonthModal(!showMonthModal)}>
          <Text style={styles.headerText}>
            {renderWeekDay(selectedDate.day())} - {selectedDate.format('DD')}{' '}
            {renderMonthName(selectedMonth)} {selectedDate.format('YYYY')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDay}>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={ref}
        horizontal
        getItemLayout={_ => ({
          length: daysInMonth.length,
          offset: daysInMonth.length * lIndex,
          index: lIndex,
        })}
        style={{flexGrow: 0}}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListStyles}
        data={daysInMonth}
        renderItem={renderDaysList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
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
    backgroundColor: Colours.gray,
    paddingVertical: vS(10),
    alignItems: 'center',
  },
});

export default Calendar;
