import {
  AddedItem,
  AddedMeal,
  BreakieDetails,
  InsertTables,
  LunchDetails,
  MealDetails,
  TablesType,
} from '@types';

type Lunchs = Partial<InsertTables<'lunchs'>>;

// type MealDetails = LunchDetails | BreakieDetails;

type MealsWithTotals = {
  created_at: string;
  dateAdded: string | null;
  id: number;
  tCalories: number | null;
  tCarbs: number | null;
  tFat: number | null;
  tFibre: number | null;
  tProtein: number | null;
  tSodium: number | null;
  user_id: string | null;
};

interface MealItem {
  calories: number;
  carbs: number;
  protein: number;
  sodium: number;
  fat: number;
  fibre: number;
  foods?: TablesType<'foods'> | null;
  recipes?: TablesType<'recipes'> | null;
}

export const handleTotals = (items: AddedItem[]) => {
  return items?.reduce(
    (acc, item) => {
      const {calories, carbs, protein, fat, fibre, sodium} = item.food;

      acc.calories += calories;
      acc.carbs += carbs;
      acc.protein += protein;
      acc.fat += fat;
      acc.fibre += fibre!;
      acc.sodium += sodium!;

      return acc;
    },
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fibre: 0,
      sodium: 0,
    },
  );
};

export const handleTotalsUpdate = <T extends MealsWithTotals>(items: T[]) => {
  return items?.reduce(
    (acc, item) => {
      const {tCalories, tCarbs, tProtein, tFat, tFibre, tSodium} = item;

      acc.tCalories! += tCalories!;
      acc.tCarbs! += tCarbs!;
      acc.tProtein! += tProtein!;
      acc.tFat! += tFat!;
      acc.tFibre! += tFibre!;
      acc.tSodium! += tSodium!;

      return acc;
    },
    {
      tCalories: 0,
      tCarbs: 0,
      tProtein: 0,
      tFat: 0,
      tFibre: 0,
      tSodium: 0,
    },
  );
};

export const handleTotalLists = (items: AddedMeal[]) => {
  return items?.reduce(
    (acc, item) => {
      if (item?.food?.itemFood) {
        const {calories, carbs, protein, fat, fibre, sodium} =
          item?.food?.itemFood;

        acc.calories += calories;
        acc.carbs += carbs;
        acc.protein += protein;
        acc.fat += fat;
        acc.fibre += fibre!;
        acc.sodium += sodium!;
      } else if (item?.recipe?.itemRecipe) {
        const {tCalories, tCarbs, tProtein, tFat, tFibre, tSodium} =
          item?.recipe?.itemRecipe;

        acc.calories += tCalories;
        acc.carbs += tCarbs;
        acc.protein += tProtein;
        acc.fat += tFat;
        acc.fibre += tFibre!;
        acc.sodium += tSodium!;
      }

      return acc;
    },
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fibre: 0,
      sodium: 0,
    },
  );
};

export const handleTotalListsUpdate = <T extends MealDetails>(items: T[]) => {
  return items?.reduce(
    (acc, item) => {
      if (item?.foods) {
        const {calories, carbs, protein, fat, fibre, sodium} = item?.foods;

        acc.calories += calories;
        acc.carbs += carbs;
        acc.protein += protein;
        acc.fat += fat;
        acc.fibre += fibre!;
        acc.sodium += sodium!;
      } else if (item?.recipes) {
        const {tCalories, tCarbs, tProtein, tFat, tFibre, tSodium} =
          item?.recipes;

        acc.calories += tCalories;
        acc.carbs += tCarbs;
        acc.protein += tProtein;
        acc.fat += tFat;
        acc.fibre += tFibre!;
        acc.sodium += tSodium!;
      }

      return acc;
    },
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fibre: 0,
      sodium: 0,
    },
  );
};
