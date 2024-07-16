import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {createContext} from 'react';
import {AddedLunch, FoodAddedItem, RecipeAddedItem, Tables} from '@types';
import {useInsertLunch, useInsertLunchItems, useUpdateLunch} from '@api';
import {handleTotalLists, handleTotalsUpdate} from '@utils';
import {calendarStore, listsStore} from '@stores';

type Food = Tables<'foods'>;
type Recipe = Tables<'recipes'>;

type ListsType = {
  lunchItems: AddedLunch[];
  addLunchItem: (
    itemFood: Food | null,
    itemRecipe: Recipe | null,
    foodQuantity: number | null,
    recipeQuantity: number | null,
  ) => void;
  removeLunchItem: (id: string) => void;
  addLunch: (onSuccess: () => void) => void;
  updateLunch: (id: number, onSuccess: () => void) => void;
  unselectCheckbox: () => void;
  handleDisableCheckbox: (singleRecipe: Food) => boolean | undefined;
  clearCart: () => void;
  isChecked: {[key: number]: boolean};
  setIsChecked: Dispatch<SetStateAction<ListsType['isChecked']>>;
};

const ListsContext = createContext<ListsType>({
  lunchItems: [],
  addLunchItem: () => {},
  addLunch: () => {},
  updateLunch: () => {},
  removeLunchItem: () => {},
  unselectCheckbox: () => {},
  handleDisableCheckbox: () => true,
  clearCart: () => [],
  isChecked: {},
  setIsChecked: () => {},
});

const ListsProvider = ({children}: PropsWithChildren) => {
  const [lunchItems, setLunchItems] = useState<AddedLunch[]>([]);
  const [isChecked, setIsChecked] = useState<ListsType['isChecked']>({});
  const {date} = calendarStore();
  const {lunchs} = listsStore();
  // console.log('lunchItems =>>', lunchItems);
  //
  // lunchItems.map(f => console.log('FOODS =>>', f.food?.itemFood));
  //
  // lunchItems.map(r => console.log('RECIPES =>>', r.recipe?.itemRecipe));
  const {mutate: addLunchToDb} = useInsertLunch();
  const {mutate: addLunchItems} = useInsertLunchItems();
  const {mutate: updateLunchs} = useUpdateLunch();

  function generateRandomId() {
    const randomDecimal = Math.random();

    const maxIdValue = 999999; // Example: Maximum ID value of 1000
    return Math.floor(randomDecimal * maxIdValue);
  }

  const addLunchItem = (
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

    const newItem: AddedLunch = {
      id: generateRandomId(),
      food: foodI,
      recipe: recipeI,
    };

    setLunchItems([newItem, ...lunchItems]);
  };

  const updateLunch = (id: number, onSuccess: () => void) => {
    const previousLunchByDate = lunchs?.filter(
      item => item.dateAdded === date.format('YYYY-MM-DD'),
    );

    const combinedInputs = {
      dateAdded: date.format('MM/DD/YYYY'),
      tCalories:
        handleTotalsUpdate(previousLunchByDate).tCalories! +
        handleTotalLists(lunchItems).calories,
      tCarbs:
        handleTotalsUpdate(previousLunchByDate)?.tCarbs! +
        handleTotalLists(lunchItems)?.carbs,
      tProtein:
        handleTotalsUpdate(previousLunchByDate)?.tProtein! +
        handleTotalLists(lunchItems)?.protein,
      tSodium:
        handleTotalsUpdate(previousLunchByDate)?.tSodium! +
        handleTotalLists(lunchItems)?.sodium,
      tFat:
        handleTotalsUpdate(previousLunchByDate)?.tFat! +
        handleTotalLists(lunchItems)?.fat,
      tFibre:
        handleTotalsUpdate(previousLunchByDate)?.tFibre! +
        handleTotalLists(lunchItems)?.fibre,
    };

    updateLunchs(
      {id, userInput: combinedInputs},
      {onSuccess: data => saveLunchItems(data, onSuccess)},
    );
  };

  const addLunch = (onSuccess: () => void) => {
    addLunchToDb(
      {
        dateAdded: date.format('MM/DD/YYYY'),
        tCalories: handleTotalLists(lunchItems).calories,
        tCarbs: handleTotalLists(lunchItems)?.carbs,
        tProtein: handleTotalLists(lunchItems)?.protein,
        tSodium: handleTotalLists(lunchItems)?.sodium,
        tFat: handleTotalLists(lunchItems)?.fat,
        tFibre: handleTotalLists(lunchItems)?.fibre,
      },
      {
        onSuccess: data => saveLunchItems(data, onSuccess),
        onError: er => console.log('ERROR LUNCH =>', er),
      },
    );
  };

  const removeLunchItem = (id: string) => {
    const shallow = [...lunchItems];
    const filteredData = shallow.filter(item => String(item.id) !== id);
    setLunchItems(filteredData);
  };

  const saveLunchItems = (lunch: Tables<'lunchs'>, onSuccess: () => void) => {
    const luItems = lunchItems.map(lu => ({
      lunch_id: lunch.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    addLunchItems(luItems, {
      onSuccess: () => {
        unselectCheckbox();
        onSuccess();
      },
      onError: e => console.log('ERROR INSERT LUNCH ITEM=>>', e),
    });
  };

  const handleDisableCheckbox = (singleRecipe: Food) => {
    if (lunchItems?.length) {
      return lunchItems
        .filter(res => res.recipe?.recipe_id === singleRecipe.id)
        .some(item => item.recipe?.recipeQuantity === singleRecipe.serv_size);
    }
  };

  const unselectCheckbox = () => {
    setLunchItems(lunchItems.map(item => ({...item, isChecked: false})));
    setLunchItems([]);
  };

  const clearCart = () => {
    setLunchItems(lunchItems.map(item => ({...item, isChecked: false})));
    setLunchItems([]);
    setIsChecked({});
  };

  return (
    <ListsContext.Provider
      value={{
        lunchItems,
        addLunchItem,
        addLunch,
        removeLunchItem,
        unselectCheckbox,
        updateLunch,
        handleDisableCheckbox,
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
