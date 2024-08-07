import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {createContext} from 'react';
import {
  AddedMeal,
  Food,
  FoodAddedItem,
  ItemWithTotals,
  MealDetails,
  MealTypes,
  Recipe,
  RecipeAddedItem,
} from '@types';
import {
  useInsertLunch,
  useInsertLunchItems,
  useUpdateLunch,
  useDeleteLunchItems,
  useInsertBreakfast,
  useInsertBreakfastItems,
  useDeleteBreakfastItems,
  useUpdateBreakfast,
  useInsertSnack,
  useInsertSnackItems,
  useUpdateSnack,
  useDeleteSnackItems,
  useInsertDinner,
  useInsertDinnerItems,
  useUpdateDinner,
  useDeleteDinnerItems,
} from '@api';
import {
  handleTotalLists,
  handleTotalListsUpdate,
  handleTotalsUpdate,
} from '@utils';
import {calendarStore, listsStore} from '@stores';

type ListsType = {
  mealsItems: AddedMeal[];
  addMealItem: (
    itemFood: Food | null,
    itemRecipe: Recipe | null,
    foodQuantity: number | null,
    recipeQuantity: number | null,
  ) => void;
  removeMealItem: (id: string) => void;
  addMeal: (onSuccess: () => void, meal: MealTypes) => void;
  updateMeal: (id: number, onSuccess: () => void, meal: MealTypes) => void;
  deleteMealItems: <T extends MealDetails>(
    id: number,
    onSuccess: () => void,
    items: T[],
    dateProp: string,
    Ids: number[],
    meal: MealTypes,
  ) => void;
  clearCart: () => void;
  isChecked: {[key: number]: boolean};
  setIsChecked: Dispatch<SetStateAction<ListsType['isChecked']>>;
};

const ListsContext = createContext<ListsType>({
  mealsItems: [],
  addMealItem: () => {},
  addMeal: () => {},
  updateMeal: () => {},
  deleteMealItems: () => {},
  removeMealItem: () => {},
  clearCart: () => [],
  isChecked: {},
  setIsChecked: () => {},
});

const ListsProvider = ({children}: PropsWithChildren) => {
  const [mealsItems, setMealsItems] = useState<AddedMeal[]>([]);
  const [isChecked, setIsChecked] = useState<ListsType['isChecked']>({});
  const {date} = calendarStore();
  const {lunchs, breakfasts, snacks, dinners} = listsStore();
  // console.log('mealsItems =>>', mealsItems);
  //
  // mealsItems.map(f => console.log('FOODS =>>', f.food?.itemFood));
  //
  // mealsItems.map(r => console.log('RECIPES =>>', r.recipe?.itemRecipe));

  /// LUNCHES
  const {mutate: addLunchToDb} = useInsertLunch();
  const {mutate: addLunchItems} = useInsertLunchItems();
  const {mutate: updateLunchs} = useUpdateLunch();
  const {mutate: deleteLunchItemsApi} = useDeleteLunchItems();

  /// BREAKFASTS
  const {mutate: addBreakieToDb} = useInsertBreakfast();
  const {mutate: addBreakieItems} = useInsertBreakfastItems();
  const {mutate: updateBreakies} = useUpdateBreakfast();
  const {mutate: deleteBreakieItemsApi} = useDeleteBreakfastItems();

  /// SNACKS
  const {mutate: addSnackToDb} = useInsertSnack();
  const {mutate: addSnackItems} = useInsertSnackItems();
  const {mutate: updateSnacks} = useUpdateSnack();
  const {mutate: deleteSnackItemsApi} = useDeleteSnackItems();

  /// DINNERS
  const {mutate: addDinnerToDb} = useInsertDinner();
  const {mutate: addDinnerItems} = useInsertDinnerItems();
  const {mutate: updateDinners} = useUpdateDinner();
  const {mutate: deleteDinnerItemsApi} = useDeleteDinnerItems();

  function generateRandomId() {
    const randomDecimal = Math.random();

    const maxIdValue = 999999; // Example: Maximum ID value of 1000
    return Math.floor(randomDecimal * maxIdValue);
  }

  const addMealItem = (
    itemFood: Food | null,
    itemRecipe: Recipe | null,
    foodQuantity: number | null,
    recipeQuantity: number | null,
  ) => {
    const foodI: FoodAddedItem = {
      food_id: itemFood?.id ? itemFood?.id : null,
      itemFood,
      foodQuantity,
    };

    const recipeI: RecipeAddedItem = {
      recipe_id: itemRecipe?.id ? itemRecipe?.id : null,
      itemRecipe,
      recipeQuantity,
    };

    const newItem: AddedMeal = {
      id: generateRandomId(),
      food: foodI,
      recipe: recipeI,
    };

    setMealsItems([newItem, ...mealsItems]);
  };

  const updateMeal = (id: number, onSuccess: () => void, meal: MealTypes) => {
    const previousLunchByDate = () => {
      switch (meal) {
        case 'lunch':
          return lunchs?.filter(
            item => item.dateAdded === date.format('YYYY-MM-DD'),
          );
        case 'breakfast':
          return breakfasts?.filter(
            item => item.dateAdded === date.format('YYYY-MM-DD'),
          );
        case 'dinner':
          return dinners?.filter(
            item => item.dateAdded === date.format('YYYY-MM-DD'),
          );
        case 'snack':
          return snacks?.filter(
            item => item.dateAdded === date.format('YYYY-MM-DD'),
          );
      }
    };

    const combinedInputs = {
      dateAdded: date.format('MM/DD/YYYY'),
      tCalories:
        handleTotalsUpdate(previousLunchByDate()!).tCalories! +
        handleTotalLists(mealsItems).calories,
      tCarbs:
        handleTotalsUpdate(previousLunchByDate()!)?.tCarbs! +
        handleTotalLists(mealsItems)?.carbs,
      tProtein:
        handleTotalsUpdate(previousLunchByDate()!)?.tProtein! +
        handleTotalLists(mealsItems)?.protein,
      tSodium:
        handleTotalsUpdate(previousLunchByDate()!)?.tSodium! +
        handleTotalLists(mealsItems)?.sodium,
      tFat:
        handleTotalsUpdate(previousLunchByDate()!)?.tFat! +
        handleTotalLists(mealsItems)?.fat,
      tFibre:
        handleTotalsUpdate(previousLunchByDate()!)?.tFibre! +
        handleTotalLists(mealsItems)?.fibre,
    };

    switch (meal) {
      case 'lunch':
        return updateLunchs(
          {id, userInput: combinedInputs},
          {
            onSuccess: data => {
              saveLunchItems(data, onSuccess, meal);
            },
          },
        );
      case 'breakfast':
        return updateBreakies(
          {id, userInput: combinedInputs},
          {
            onSuccess: data => {
              saveLunchItems(data, onSuccess, meal);
            },
          },
        );
      case 'snack':
        return updateSnacks(
          {id, userInput: combinedInputs},
          {
            onSuccess: data => {
              saveLunchItems(data, onSuccess, meal);
            },
          },
        );
      case 'dinner':
        return updateDinners(
          {id, userInput: combinedInputs},
          {
            onSuccess: data => {
              saveLunchItems(data, onSuccess, meal);
            },
          },
        );
    }
  };

  const deleteMealItems = <T extends MealDetails>(
    id: number,
    onSuccess: () => void,
    items: T[],
    dateProp: string,
    Ids: number[],
    meal: MealTypes,
  ) => {
    const combinedInputs = {
      dateAdded: dateProp,
      tCalories: handleTotalListsUpdate(items!).calories,
      tCarbs: handleTotalListsUpdate(items!)?.carbs,
      tProtein: handleTotalListsUpdate(items!)?.protein,
      tSodium: handleTotalListsUpdate(items!)?.sodium,
      tFat: handleTotalListsUpdate(items!)?.fat,
      tFibre: handleTotalListsUpdate(items!)?.fibre,
    };

    switch (meal) {
      case 'lunch':
        return updateLunchs(
          {id, userInput: combinedInputs},
          {
            onSuccess: () => {
              handleDeleteLunchItems(onSuccess, Ids, meal);
            },
          },
        );
      case 'breakfast':
        return updateBreakies(
          {id, userInput: combinedInputs},
          {
            onSuccess: () => {
              handleDeleteLunchItems(onSuccess, Ids, meal);
            },
          },
        );
      case 'dinner':
        return updateDinners(
          {id, userInput: combinedInputs},
          {
            onSuccess: () => {
              handleDeleteLunchItems(onSuccess, Ids, meal);
            },
          },
        );
      case 'snack':
        return updateSnacks(
          {id, userInput: combinedInputs},
          {
            onSuccess: () => {
              handleDeleteLunchItems(onSuccess, Ids, meal);
            },
          },
        );
    }
  };

  const handleDeleteLunchItems = (
    onSuccess: () => void,
    Ids: number[],
    meal: MealTypes,
  ) => {
    switch (meal) {
      case 'lunch':
        return deleteLunchItemsApi(Ids, {
          onSuccess: () => {
            onSuccess();
          },
          onError: e => console.log('ERROR DELETING LUNCH ITEMS=>>', e),
        });
      case 'breakfast':
        return deleteBreakieItemsApi(Ids, {
          onSuccess: () => {
            onSuccess();
          },
          onError: e => console.log('ERROR DELETING BREAKIE ITEMS=>>', e),
        });
      case 'snack':
        return deleteSnackItemsApi(Ids, {
          onSuccess: () => {
            onSuccess();
          },
          onError: e => console.log('ERROR DELETING SNACK ITEMS=>>', e),
        });
      case 'dinner':
        return deleteDinnerItemsApi(Ids, {
          onSuccess: () => {
            onSuccess();
          },
          onError: e => console.log('ERROR DELETING DINNER ITEMS=>>', e),
        });
    }
  };

  const addMeal = (onSuccess: () => void, meal: MealTypes) => {
    const variables = {
      dateAdded: date.format('MM/DD/YYYY'),
      tCalories: handleTotalLists(mealsItems).calories,
      tCarbs: handleTotalLists(mealsItems)?.carbs,
      tProtein: handleTotalLists(mealsItems)?.protein,
      tSodium: handleTotalLists(mealsItems)?.sodium,
      tFat: handleTotalLists(mealsItems)?.fat,
      tFibre: handleTotalLists(mealsItems)?.fibre,
    };

    switch (meal) {
      case 'lunch':
        return addLunchToDb(
          variables,

          {
            onSuccess: data =>
              saveLunchItems<ItemWithTotals>(data, onSuccess, meal),
            onError: er => console.log('ERROR ADD LUNCH =>', er),
          },
        );
      case 'breakfast':
        return addBreakieToDb(
          variables,

          {
            onSuccess: data =>
              saveLunchItems<ItemWithTotals>(data, onSuccess, meal),
            onError: er => console.log('ERROR ADD BREAKIE =>', er),
          },
        );
      case 'snack':
        return addSnackToDb(
          variables,

          {
            onSuccess: data =>
              saveLunchItems<ItemWithTotals>(data, onSuccess, meal),
            onError: er => console.log('ERROR ADD SNACK =>', er),
          },
        );
      case 'dinner':
        return addDinnerToDb(
          variables,

          {
            onSuccess: data =>
              saveLunchItems<ItemWithTotals>(data, onSuccess, meal),
            onError: er => console.log('ERROR ADD DINNER =>', er),
          },
        );
    }
  };

  const removeMealItem = (id: string) => {
    const shallow = [...mealsItems];
    const filteredData = shallow.filter(item => String(item.id) !== id);
    setMealsItems(filteredData);
  };

  const saveLunchItems = <T extends ItemWithTotals>(
    lunch: T,
    onSuccess: () => void,
    meal: MealTypes,
  ) => {
    const luItems = mealsItems.map(lu => ({
      lunch_id: lunch.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    const breakieItems = mealsItems.map(lu => ({
      breakfast_id: lunch?.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    const snackItems = mealsItems.map(lu => ({
      snack_id: lunch?.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    const dinnerItems = mealsItems.map(lu => ({
      dinner_id: lunch?.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    switch (meal) {
      case 'lunch':
        return addLunchItems(luItems, {
          onSuccess: () => {
            clearCart();
            onSuccess();
          },
          onError: e => console.log('ERROR INSERT LUNCH ITEM=>>', e),
        });
      case 'breakfast':
        return addBreakieItems(breakieItems, {
          onSuccess: () => {
            clearCart();
            onSuccess();
          },
          onError: e => console.log('ERROR INSERT BREAKIE ITEM=>>', e),
        });
      case 'snack':
        return addSnackItems(snackItems, {
          onSuccess: () => {
            clearCart();
            onSuccess();
          },
          onError: e => console.log('ERROR INSERT SNACK ITEM=>>', e),
        });
      case 'dinner':
        return addDinnerItems(dinnerItems, {
          onSuccess: () => {
            clearCart();
            onSuccess();
          },
          onError: e => console.log('ERROR INSERT DINNER ITEM=>>', e),
        });
    }
  };

  const clearCart = () => {
    setMealsItems(mealsItems.map(item => ({...item, isChecked: false})));
    setMealsItems([]);
    setIsChecked({});
  };

  return (
    <ListsContext.Provider
      value={{
        mealsItems,
        addMealItem,
        addMeal,
        removeMealItem,
        updateMeal,
        deleteMealItems,
        clearCart,
        setIsChecked,
        isChecked,
      }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
export const useLists = () => useContext(ListsContext);
