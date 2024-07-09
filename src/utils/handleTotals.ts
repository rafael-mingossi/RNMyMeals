import {AddedItem, AddedLunch, Tables} from '@types';

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

export const handleTotalLists = (items: AddedLunch[]) => {
  return items?.reduce(
    (acc, item) => {
      const {calories, carbs, protein, fat, fibre, sodium} =
        item?.food?.itemFood!;

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
