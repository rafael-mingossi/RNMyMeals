import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {getDaysInMonth, renderMonthName, renderWeekDay} from '@utils';
import styles from './calendar.styles.ts';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

//// ICONS
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {calendarStore} from '@stores';

type SingleDayList = {
  item: {date: dayjs.Dayjs};
  index: number;
};

const Calendar = () => {
  const {date, setDate} = calendarStore();
  const [lIndex, setLIndex] = useState(dayjs().date() - 1);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedMonthModal, setSelectedMonthModal] = useState(dayjs().month());

  const ref = useRef<FlatList>(null);
  const handlePrevDay = () => {
    setDate(date.subtract(1, 'day'));
    if (lIndex === 0) {
      return;
    }
    setLIndex(lIndex - 1);
  };

  const handleNextDay = () => {
    setDate(date.add(1, 'day'));
    if (lIndex === daysInMonth.length - 1) {
      return;
    }
    setLIndex(lIndex + 1);
  };

  const handleSetMonth = (targetMonth: number) => {
    const newDate = date.set('month', targetMonth); // Month values in day.js are 0-indexed
    setDate(newDate);
  };

  const daysInMonth = getDaysInMonth(date);

  const renderDaysList = ({item, index}: SingleDayList) => {
    const dayShort = item.date;
    // const isSelected = dayShort?.isSame(date, 'day');
    return (
      <TouchableOpacity
        key={index}
        style={lIndex === index && styles.selectedDay}
        onPress={() => {
          setLIndex(index);
          setDate(dayShort);
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
    handleSetMonth(selectedMonthModal);
    handleOnCloseModal();
  };

  return (
    <View style={styles.calendarContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMonthModal}
        statusBarTranslucent={true}
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
            {renderWeekDay(date.day())} - {date.format('DD')}{' '}
            {renderMonthName(selectedMonth)} {date.format('YYYY')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDay}>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
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

export default Calendar;
