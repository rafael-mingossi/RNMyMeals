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
  const {lunchs, breakfasts, snacks, dinners} = listsStore();
  const {date} = calendarStore();

  const lunchFiltered = lunchs?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  const breakiesFiltered = breakfasts?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  const snacksFiltered = snacks?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  const dinnersFiltered = dinners?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.surface} elevation={3}>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => navigation.navigate('MealBreakie')}>
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
              {breakiesFiltered?.length ? breakiesFiltered[0]?.tCalories : 0}{' '}
              <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => navigation.navigate('MealLunch')}>
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
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => navigation.navigate('MealSnack')}>
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
              {snacksFiltered?.length ? snacksFiltered[0]?.tCalories : 0}{' '}
              <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => navigation.navigate('MealDinner')}>
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
              {dinnersFiltered?.length ? dinnersFiltered[0]?.tCalories : 0}{' '}
              <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </TouchableOpacity>
        </Surface>
        <Surface style={styles.surface}>
          <Text style={styles.dayTotalsTitle}>Day Totals</Text>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Cals</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tCalories! +
                breakiesFiltered[0]?.tCalories! +
                snacksFiltered[0]?.tCalories! +
                dinnersFiltered[0]?.tCalories! || 0}{' '}
              cals
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Protein</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tProtein! +
                breakiesFiltered[0]?.tProtein! +
                snacksFiltered[0]?.tProtein! +
                dinnersFiltered[0]?.tProtein! || 0}{' '}
              grams
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Carbs</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tCarbs! +
                breakiesFiltered[0]?.tCarbs! +
                snacksFiltered[0]?.tCarbs! +
                dinnersFiltered[0]?.tCarbs! || 0}{' '}
              grams
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fat</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tFat! +
                breakiesFiltered[0]?.tFat! +
                snacksFiltered[0]?.tFat! +
                dinnersFiltered[0]?.tFat! || 0}{' '}
              grams
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Sodium</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tSodium! +
                breakiesFiltered[0]?.tSodium! +
                snacksFiltered[0]?.tSodium! +
                dinnersFiltered[0]?.tSodium! || 0}{' '}
              grams
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fibre</Text>
            <Text style={styles.dayTotalsTxt}>
              {lunchFiltered[0]?.tFibre! +
                breakiesFiltered[0]?.tFibre! +
                snacksFiltered[0]?.tFibre! +
                dinnersFiltered[0]?.tFibre! || 0}{' '}
              grams
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default AllMeals;
