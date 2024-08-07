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
import {Calendar, Surface} from '@components';
import {Colours} from '@constants';
import {ScreenStack} from '@config';
import {useAllMealsTotals} from '@utils';

const AllMeals = ({navigation}: ScreenStack) => {
  const {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFibre,
    totalFat,
    totalSodium,
    mealCalories,
  } = useAllMealsTotals();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
        <Text>ONB</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface stylesExtra={styles.surface}>
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
              {mealCalories.breakfasts.toFixed(0)}{' '}
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
              {mealCalories.lunchs.toFixed(0)}{' '}
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
              {mealCalories.snacks.toFixed(0)}{' '}
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
              {mealCalories.dinners} <Text style={styles.calsTxt}>cals</Text>
            </Text>
          </TouchableOpacity>
        </Surface>
        <Surface stylesExtra={styles.surface}>
          <Text style={styles.dayTotalsTitle}>Day Totals</Text>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Cals</Text>
            <Text style={styles.dayTotalsTxt}>{totalCalories} calories</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Protein</Text>
            <Text style={styles.dayTotalsTxt}>{totalProtein} grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Carbs</Text>
            <Text style={styles.dayTotalsTxt}>{totalCarbs} grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fat</Text>
            <Text style={styles.dayTotalsTxt}>{totalFat} grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Sodium</Text>
            <Text style={styles.dayTotalsTxt}>{totalSodium} grams</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.dayTotalsTxt}>Fibre</Text>
            <Text style={styles.dayTotalsTxt}>{totalFibre} grams</Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default AllMeals;
