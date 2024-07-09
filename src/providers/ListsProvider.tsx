import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext} from 'react';
import {AddedLunch, FoodAddedItem, RecipeAddedItem, Tables} from '@types';
import {useInsertLunch, useInsertLunchItems} from '@api';
import {handleTotalLists} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreenTopProp} from '@config';

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
};

const ListsContext = createContext<ListsType>({
  lunchItems: [],
  addLunchItem: () => {},
  addLunch: () => {},
  removeLunchItem: () => {},
});

const ListsProvider = ({children}: PropsWithChildren) => {
  const [lunchItems, setLunchItems] = useState<AddedLunch[]>([]);

  const {mutate: addLunchToDb} = useInsertLunch();
  const {mutate: addLunchItems} = useInsertLunchItems();

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

  const addLunch = (onSuccess: () => void) => {
    addLunchToDb(
      {
        dateAdded: '05/20/2024',
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
        onSuccess();
        setLunchItems([]);
      },
      onError: e => console.log('ERROR INSERT LUNCH ITEM=>>', e),
    });
  };

  return (
    <ListsContext.Provider
      value={{lunchItems, addLunchItem, addLunch, removeLunchItem}}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
export const useLists = () => useContext(ListsContext);
