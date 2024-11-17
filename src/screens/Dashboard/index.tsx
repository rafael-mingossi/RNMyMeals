import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {
  // useGetFoodsById,
  // useMyBreakfastList,
  // useMyDinnersList,
  // useMyLunchsList,
  // useMyRecipesList,
  // useMySnacksList,
  useGetUserById,
} from '@api';
import {
  Calendar,
  AnimatedSemicircle,
  Loader,
  ButtonText,
  Surface,
} from '@components';
import {Colours} from '@constants';
import styles from './dashboard.styles.ts';
import {BottomScreenStack} from '../../config/BottomNavigator.tsx';
import {calendarStore} from '@stores';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {useFont} from '@shopify/react-native-skia';
import {mS, useAllMealsTotals} from '@utils';
import {useAuth} from '@providers';

const MAX_CALORIES = 2000;

const Dashboard = ({navigation}: BottomScreenStack) => {
  const {date} = calendarStore();
  const {profile} = useAuth();
  const {totalCalories, mealCalories} = useAllMealsTotals();
  const animatedProgress = useSharedValue(0);
  const animatedTotalCal = useSharedValue(0);

  // const {data: ingredientsApi, isLoading: loadFoods} = useGetFoodsById();
  // const {data: recipesApi, isLoading: loadRecipes} = useMyRecipesList();
  // const {data: lunchsApi, isLoading: loadLunchs} = useMyLunchsList();
  // const {data: breakfastsApi, isLoading: loadBreakies} = useMyBreakfastList();
  // const {data: dinnersApi, isLoading: loadDinners} = useMyDinnersList();
  // const {data: snacksApi, isLoading: loadSnacks} = useMySnacksList();
  const {data: userApi, isLoading: loadUser} = useGetUserById();

  const font = useFont(require('../../assets/fonts/Mulish-Bold.ttf'), mS(30));

  const currentProgress = useMemo(
    () => Number(totalCalories) / (userApi?.cal_goal || MAX_CALORIES),
    [totalCalories],
  );

  useEffect(() => {
    animatedProgress.value = withTiming(currentProgress, {duration: 800});
    animatedTotalCal.value = withTiming(totalCalories, {duration: 800});
  }, [
    currentProgress,
    date,
    totalCalories,
    animatedProgress,
    animatedTotalCal,
  ]);

  if (
    !font ||
    loadUser
    // loadFoods ||
    // loadRecipes ||
    // loadLunchs ||
    // loadBreakies ||
    // loadDinners ||
    // loadSnacks ||
    // loadUser
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
          maxValue={userApi?.cal_goal || MAX_CALORIES}
          progress={animatedProgress}
          totalCals={animatedTotalCal}
          font={font}
        />
        <Surface>
          <ButtonText
            children={'MANAGE MY MEALS'}
            onPress={() => {
              navigation.navigate('AllMeals');
            }}
          />
          <View style={styles.mealRowWrapper}>
            <View style={styles.singleMealWrapper}>
              <Text style={styles.mealTitle}>Lunch</Text>
              <Text style={styles.mealValueTxt}>
                {mealCalories.lunchs.toFixed(0)}
              </Text>
            </View>
            <View style={styles.singleMealWrapper}>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <Text style={styles.mealValueTxt}>
                {mealCalories.breakfasts.toFixed(0)}
              </Text>
            </View>
          </View>
          <View style={[styles.mealRowWrapper]}>
            <View style={styles.singleMealWrapper}>
              <Text style={styles.mealTitle}>Snacks</Text>
              <Text style={styles.mealValueTxt}>
                {mealCalories.snacks.toFixed(0)}
              </Text>
            </View>
            <View style={[styles.singleMealWrapper]}>
              <Text style={styles.mealTitle}>Dinner</Text>
              <Text style={styles.mealValueTxt}>
                {mealCalories.dinners.toFixed(0)}
              </Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
