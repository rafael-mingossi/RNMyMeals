import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './allMeals.styles.ts';
import {Surface} from 'react-native-paper';
import {Calendar} from '@components';
import {calendarStore, listsStore} from '@stores';
import {Colours} from '@constants';
import {ScreenStack} from '@config';

const AllMeals = ({navigation}: ScreenStack) => {
  const {lunchs} = listsStore();
  const {date} = calendarStore();

  const lunchFiltered = lunchs?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.surface} elevation={3}>
          <View style={styles.rowItem}>
            <View style={styles.iconAndText}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_breakie.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconTxt}>Breakie</Text>
            </View>
            <Text style={styles.calValTxt}>
              0 <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => navigation.navigate('SingleMealLunch')}>
            <View style={styles.iconAndText}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_lunch.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconTxt}>Lunch</Text>
            </View>
            <Text style={styles.calValTxt}>
              {lunchFiltered?.length ? lunchFiltered[0]?.tCalories : 0}{' '}
              <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.rowItem}>
            <View style={styles.iconAndText}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_snack.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconTxt}>Snacks</Text>
            </View>
            <Text style={styles.calValTxt}>
              0 <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </View>
          <View style={styles.rowItem}>
            <View style={styles.iconAndText}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_dinner.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconTxt}>Dinner</Text>
            </View>
            <Text style={styles.calValTxt}>
              0 <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </View>
        </Surface>
        <Surface style={styles.surface}>
          <Text style={styles.dayTotalsTitle}>Day Totals</Text>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Cals</Text>
            <Text style={styles.dayTotalsTxt}>
              {' '}
              {lunchFiltered?.length ? lunchFiltered[0]?.tCalories : 0} cals
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Protein</Text>
            <Text style={styles.dayTotalsTxt}>200 grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Carbs</Text>
            <Text style={styles.dayTotalsTxt}>50 grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fat</Text>
            <Text style={styles.dayTotalsTxt}>10 grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Sodium</Text>
            <Text style={styles.dayTotalsTxt}>0.2 grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fibre</Text>
            <Text style={styles.dayTotalsTxt}>20 grams</Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default AllMeals;
