import {AddedItem, AddedLunch, InsertTables, LunchDetails} from '@types';

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

export const handleTotalListsUpdate = (items: LunchDetails[]) => {
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

const itemsToBeDeleted = [
  {
    food: {foodQuantity: 8, food_id: 47, itemFood: [Object]},
    id: 813760,
    recipe: {itemRecipe: null, recipeQuantity: null, recipe_id: null},
  },
  {
    food: {foodQuantity: 200, food_id: 49, itemFood: [Object]},
    id: 388700,
    recipe: {itemRecipe: null, recipeQuantity: null, recipe_id: null},
  },
];

const ITEMS = [
  {
    created_at: '2024-07-14T12:43:27.736491+00:00',
    foodQuantity: null,
    food_id: null,
    foods: null,
    id: 20,
    lunch_id: 11,
    recipeQuantity: 1,
    recipe_id: 7,
    recipes: {
      created_at: '2024-06-28T21:34:01.763156+00:00',
      id: 7,
      img: null,
      name: 'X Z 22',
      serv_unit: 'serv',
      serving: 1,
      tCalories: 100,
      tCarbs: 7,
      tFat: 10,
      tFibre: 2,
      tProtein: 7,
      tSodium: 2,
      user_id: 'f5072b71-3672-47e0-bd14-a0a0cb4b2a85',
    },
  },
  {
    created_at: '2024-07-14T12:43:27.736491+00:00',
    foodQuantity: 1,
    food_id: 50,
    foods: {
      calories: 50,
      carbs: 2,
      created_at: '2024-06-27T22:21:35.306483+00:00',
      fat: 5,
      fibre: 2,
      food_img:
        'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/f5bc4f63-df10-4dad-b747-b38e98504a82.png',
      id: 50,
      label: 'Abcd',
      protein: 2,
      serv_size: 1,
      serv_unit: 'Spoon',
      sodium: 2,
      user_id: 'f5072b71-3672-47e0-bd14-a0a0cb4b2a85',
    },
    id: 21,
    lunch_id: 11,
    recipeQuantity: null,
    recipe_id: null,
    recipes: null,
  },
];

const Items_to_delete = [
  {
    id: 10,
    itemData: {
      created_at: '2024-07-11T00:59:29.250806+00:00',
      foodQuantity: 10,
      food_id: 47,
      foods: [Object],
      id: 10,
      lunch_id: 7,
      recipeQuantity: null,
      recipe_id: null,
      recipes: null,
    },
    toBeDeleted: false,
  },
  {
    id: 11,
    itemData: {
      created_at: '2024-07-11T00:59:29.250806+00:00',
      foodQuantity: 50,
      food_id: 45,
      foods: [Object],
      id: 11,
      lunch_id: 7,
      recipeQuantity: null,
      recipe_id: null,
      recipes: null,
    },
    toBeDeleted: false,
  },
  {
    id: 14,
    itemData: {
      created_at: '2024-07-12T06:44:49.624312+00:00',
      foodQuantity: 200,
      food_id: 49,
      foods: [Object],
      id: 14,
      lunch_id: 7,
      recipeQuantity: null,
      recipe_id: null,
      recipes: null,
    },
    toBeDeleted: false,
  },
];

const LU_ITEMS = [
  {
    foodQuantity: 2,
    food_id: 43,
    lunch_id: 14,
    recipeQuantity: null,
    recipe_id: null,
  },
];

const LU_UP = [
  {
    foodQuantity: 100,
    food_id: 49,
    lunch_id: 14,
    recipeQuantity: null,
    recipe_id: null,
  },
  {
    foodQuantity: 10,
    food_id: 45,
    lunch_id: 14,
    recipeQuantity: null,
    recipe_id: null,
  },
];
