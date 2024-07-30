import {calendarStore, listsStore} from '@stores';
import {useCallback, useMemo} from 'react';
import {ItemWithTotals} from '@types';

type MealSumUp = {
  lunchs: number;
  breakfasts: number;
  snacks: number;
  dinners: number;
};

export const useAllMealsTotals = () => {
  const {date} = calendarStore();
  const {lunchs, breakfasts, snacks, dinners} = listsStore();

  const filterMealsByDate = useCallback(
    (meals: ItemWithTotals[] | undefined) =>
      meals?.filter(
        item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
      ) || [],
    [date],
  );

  const handleMealSumUp = (meal: MealSumUp): number => {
    return Object.values(meal).reduce((sum, mealSum) => sum + mealSum, 0);
  };

  const {
    totalCalories,
    mealCalories,
    totalProtein,
    totalCarbs,
    totalFibre,
    totalSodium,
    totalFat,
  } = useMemo(() => {
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

    const calculatedMealProtein = {
      lunchs: filteredMeals.lunchs[0]?.tProtein || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tProtein || 0,
      snacks: filteredMeals.snacks[0]?.tProtein || 0,
      dinners: filteredMeals.dinners[0]?.tProtein || 0,
    };

    const calculatedMealCarbs = {
      lunchs: filteredMeals.lunchs[0]?.tCarbs || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tCarbs || 0,
      snacks: filteredMeals.snacks[0]?.tCarbs || 0,
      dinners: filteredMeals.dinners[0]?.tCarbs || 0,
    };

    const calculatedMealFat = {
      lunchs: filteredMeals.lunchs[0]?.tFat || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tFat || 0,
      snacks: filteredMeals.snacks[0]?.tFat || 0,
      dinners: filteredMeals.dinners[0]?.tFat || 0,
    };

    const calculatedMealFibre = {
      lunchs: filteredMeals.lunchs[0]?.tFibre || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tFibre || 0,
      snacks: filteredMeals.snacks[0]?.tFibre || 0,
      dinners: filteredMeals.dinners[0]?.tFibre || 0,
    };

    const calculatedMealSodium = {
      lunchs: filteredMeals.lunchs[0]?.tSodium || 0,
      breakfasts: filteredMeals.breakfasts[0]?.tSodium || 0,
      snacks: filteredMeals.snacks[0]?.tSodium || 0,
      dinners: filteredMeals.dinners[0]?.tSodium || 0,
    };

    const calculatedTotalCalories = handleMealSumUp(calculatedMealCalories);
    const calculatedTotalProtein = handleMealSumUp(calculatedMealProtein);
    const calculatedTotalCarbs = handleMealSumUp(calculatedMealCarbs);
    const calculatedTotalFat = handleMealSumUp(calculatedMealFat);
    const calculatedTotalFibre = handleMealSumUp(calculatedMealFibre);
    const calculatedTotalSodium = handleMealSumUp(calculatedMealSodium);

    return {
      totalCalories: Number(calculatedTotalCalories.toFixed(0)),
      totalProtein: calculatedTotalProtein.toFixed(0),
      totalCarbs: calculatedTotalCarbs.toFixed(0),
      totalFat: calculatedTotalFat.toFixed(0),
      totalFibre: calculatedTotalFibre.toFixed(0),
      totalSodium: calculatedTotalSodium.toFixed(0),
      mealCalories: calculatedMealCalories,
    };
  }, [lunchs, breakfasts, snacks, dinners, filterMealsByDate]);

  return {
    totalCalories,
    mealCalories,
    totalProtein,
    totalCarbs,
    totalFibre,
    totalSodium,
    totalFat,
  };
};
