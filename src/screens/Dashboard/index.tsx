import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {
  useGetFoodsById,
  useMyBreakfastList,
  useMyDinnersList,
  useMyLunchsList,
  useMyRecipesList,
  useMySnacksList,
} from '@api';
import {Calendar, AnimatedSemicircle, Loader} from '@components';
import {Colours} from '@constants';
import styles from './dashboard.styles.ts';
import {BottomScreenStack} from '../../config/BottomNavigator.tsx';
import {calendarStore, listsStore} from '@stores';
import {ItemWithTotals} from '@types';

const MAX_CALORIES = 2000;

const Dashboard = ({navigation}: BottomScreenStack) => {
  // const data = [{value: 50}, {value: 80}, {value: 90}];
  const {date} = calendarStore();
  const {lunchs, breakfasts, snacks, dinners} = listsStore();

  const {data: ingredientsApi, isLoading: loadFoods} = useGetFoodsById();
  const {data: recipesApi, isLoading: loadRecipes} = useMyRecipesList();
  const {data: lunchsApi, isLoading: loadLunchs} = useMyLunchsList();
  const {data: breakfastsApi, isLoading: loadBreakies} = useMyBreakfastList();
  const {data: dinnersApi, isLoading: loadDinners} = useMyDinnersList();
  const {data: snacksApi, isLoading: loadSnacks} = useMySnacksList();

  const filterMealsByDate = useCallback(
    (meals: ItemWithTotals[] | undefined) =>
      meals?.filter(
        item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
      ) || [],
    [date],
  );

  const {totalCalories, mealCalories} = useMemo(() => {
    const filteredMeals = {
      lunchs: filterMealsByDate(lunchs),
      breakfasts: filterMealsByDate(breakfasts),
      snacks: filterMealsByDate(snacks),
      dinners: filterMealsByDate(dinners),
    };

    const calculatedMealCalories = {
      lunchs: filteredMeals.lunchs[0]?.tCalories || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tCalories || 0,
      snacks: filteredMeals.snacks[0]?.tCalories || 0,
      dinners: filteredMeals.dinners[0]?.tCalories || 0,
    };

    const calculatedTotalCalories = Object.values(
      calculatedMealCalories,
    ).reduce((sum, cal) => sum + cal, 0);

    return {
      totalCalories: calculatedTotalCalories,
      mealCalories: calculatedMealCalories,
    };
  }, [lunchs, breakfasts, snacks, dinners, date, filterMealsByDate]);

  const currentProgress = useMemo(
    () => (totalCalories / MAX_CALORIES) * 100,
    [totalCalories],
  );

  if (
    loadFoods ||
    loadRecipes ||
    loadLunchs ||
    loadBreakies ||
    loadDinners ||
    loadSnacks
  ) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        {/*<PieChart data={data} donut />*/}
        <AnimatedSemicircle
          maxValue={2000}
          progress={currentProgress / 100}
          minValue={totalCalories}
        />
        <Pressable onPress={() => navigation.navigate('AllMeals')}>
          <Text>ALL MEALS</Text>
        </Pressable>
        <View>
          <Text>Total Calories: {totalCalories}</Text>
          <Text>Lunch: {mealCalories.lunchs}</Text>
          <Text>Breakfast: {mealCalories.breakfasts}</Text>
          <Text>Snacks: {mealCalories.snacks}</Text>
          <Text>Dinner: {mealCalories.dinners}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
