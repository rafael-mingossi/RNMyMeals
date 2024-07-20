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
// import timezone from 'dayjs/plugin/timezone';
import {getDaysInMonth, hS, renderMonthName, renderWeekDay} from '@utils';
import styles from './calendar.styles.ts';
import {Icon} from 'react-native-paper';

dayjs.extend(utc);
dayjs.extend(localeData);
// dayjs.extend(timezone);
// dayjs.tz.guess();

import {calendarStore} from '@stores';

type SingleDayList = {
  item: {date: dayjs.Dayjs};
  index: number;
};

const Calendar = () => {
  const {date, setDate} = calendarStore();
  const daysInMonth = getDaysInMonth(date);

  const [lIndex, setLIndex] = useState(() =>
    daysInMonth.findIndex(day => {
      return day.date.date() === date.date();
    }),
  );
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
        <Text
          style={[styles.dayText, lIndex === index && styles.selectedDayTxt]}>
          {dayShort?.date()}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    // daysInMonth.filter(day => console.log(day.date.date() === date.date()));
    setTimeout(() => {
      ref?.current?.scrollToIndex({
        index: lIndex,
        animated: true,
        viewOffset: 10, //this is in pixels, 10px from the edges works like a margin
        viewPosition: 0.4, //0.5 middle of screen
      });
    }, 800);
  }, [lIndex, daysInMonth]);

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

  // const handleScrollToIndexFailed = (error: {
  //   averageItemLength: number;
  //   index: number;
  // }) => {
  //   const centeredOffset =
  //     error.index * error.averageItemLength -
  //     ((daysInMonth.length - 1) * hS(50)) / 2;
  //   ref.current?.scrollToOffset({
  //     offset: centeredOffset,
  //     animated: true,
  //   });
  // };

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
          <Icon size={hS(22)} source={'chevron-left'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMonthModal(!showMonthModal)}>
          <Text style={styles.headerText}>
            {renderWeekDay(date.day())} - {date.format('DD')}{' '}
            {renderMonthName(selectedMonth)} {date.format('YYYY')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDay}>
          <Icon size={hS(22)} source={'chevron-right'} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={ref}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={lIndex}
        getItemLayout={_ => ({
          length: daysInMonth.length,
          offset: daysInMonth.length * lIndex,
          index: lIndex,
        })}
        // onScrollToIndexFailed={handleScrollToIndexFailed}
        style={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListStyles}
        data={daysInMonth}
        renderItem={renderDaysList}
      />
    </View>
  );
};

export default Calendar;
