import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from './singleMealLunch.styles.ts';
import {Colours} from '@constants';
import {Calendar} from '@components';
import {Surface} from 'react-native-paper';
import {calendarStore, listsStore} from '@stores';
import {useLunchDetails} from '@api';

const SingleMealLunch = () => {
  const {lunchs} = listsStore();
  const {date} = calendarStore();

  const lunchFiltered = lunchs?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  const {data, isLoading, error} = useLunchDetails(lunchFiltered[0]?.id);

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingView}>
        <Text>ERROR LOADING</Text>
      </View>
    );
  }
  console.log('data =>', data);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.surface} elevation={3}>
          {lunchFiltered.map(item => (
            <Text key={item.id}>{item.dateAdded}</Text>
          ))}
        </Surface>
      </ScrollView>
    </View>
  );
};

export default SingleMealLunch;
