import React from 'react';
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
  useMyLunchsList,
  useMyRecipesList,
} from '@api';
import {Calendar} from '@components';
import {Colours} from '@constants';
import styles from './dashboard.styles.ts';
import {BottomScreenStack} from '../../config/BottomNavigator.tsx';

const Dashboard = ({navigation}: BottomScreenStack) => {
  const data = [{value: 50}, {value: 80}, {value: 90}];

  const {data: ingredients, isLoading: loadFoods} = useGetFoodsById();
  const {data: recipes, isLoading: loadRecipes} = useMyRecipesList();
  const {data: lunchs, isLoading: loadLunchs} = useMyLunchsList();
  const {data: breakfasts, isLoading: loadBreakies} = useMyBreakfastList();

  if (loadFoods || loadRecipes || loadLunchs || loadBreakies) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <PieChart data={data} donut />
        <Pressable onPress={() => navigation.navigate('AllMeals')}>
          <Text>ALL MEALS</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
