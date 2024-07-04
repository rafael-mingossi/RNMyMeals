import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext} from 'react';
import {AddedLunch, FoodAddedItem, RecipeAddedItem, Tables} from '@types';
import {useInsertLunch, useInsertLunchItems} from '@api';

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
  addLunch: () => void;
};

const ListsContext = createContext<ListsType>({
  lunchItems: [],
  addLunchItem: () => {},
  addLunch: () => {},
});

const ListsProvider = ({children}: PropsWithChildren) => {
  const [lunchItems, setLunchItems] = useState<AddedLunch[]>([]);

  const {mutate: addLunchToDb} = useInsertLunch();
  const {mutate: addLunchItems} = useInsertLunchItems();

  function generateRandomId() {
    const randomDecimal = Math.random();

    const maxIdValue = 1000; // Example: Maximum ID value of 1000
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

  const addLunch = () => {
    addLunchToDb(
      {
        dateAdded: '10/01/1900',
        tCalories: 1,
        tCarbs: 2,
        tProtein: 3,
        tSodium: 4,
        tFat: 5,
        tFibre: 6,
      },
      {
        onSuccess: saveLunchItems,
        onError: er => console.log('ERROR LUNCH =>', er),
      },
    );
  };

  const saveLunchItems = (lunch: Tables<'lunchs'>) => {
    const luItems = lunchItems.map(lu => ({
      lunch_id: lunch.id,
      food_id: lu?.food?.food_id,
      foodQuantity: lu?.food?.foodQuantity,
      recipe_id: lu?.recipe?.recipe_id,
      recipeQuantity: lu?.recipe?.recipeQuantity,
    }));

    addLunchItems(luItems, {
      onSuccess: () => console.log('DONE ADDING LUNCH ITEMS'),
      onError: e => console.log('ERROR INSERT LUNCH ITEM=>>', e),
    });
  };

  return (
    <ListsContext.Provider value={{lunchItems, addLunchItem, addLunch}}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
export const useLists = () => useContext(ListsContext);
