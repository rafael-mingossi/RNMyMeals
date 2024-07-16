import {AddedItem, AddedLunch, InsertTables} from '@types';

type Lunchs = Partial<InsertTables<'lunchs'>>;

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

export const handleTotalsUpdate = (items: Lunchs[]) => {
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

export const handleTotalLists = (items: AddedLunch[]) => {
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
