import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from '@components';

const Dashboard = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>DASH</Text>
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  day: {
    // marginVertical: 30,
    // padding: 10,
  },
  selectedDay: {
    backgroundColor: 'red',
    borderRadius: 100,
    color: 'black',
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignItems: 'center',
  },
  dayText: {
    color: 'blue',
    padding: 10,
  },

  daysContainer: {
    padding: 15,
  },
  headerText: {
    fontSize: 18,
  },
  selected: {
    backgroundColor: 'green',
    borderRadius: 10,
    overflow: 'hidden',
  },
  textSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  nonSelected: {
    padding: 7,
  },
  monthsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  singleMonth: {
    padding: 7,
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Set outer view opacity
  },
  innerView: {
    backgroundColor: 'white', // No opacity for inner view
    padding: 20,
    borderRadius: 10,
    width: '87%',
  },
  bottomModalButtons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
  },
});

export default Dashboard;
