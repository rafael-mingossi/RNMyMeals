import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext} from 'react';
import {Tables, AddedItem} from '@types';
import {useInsertRecipe, useInsertRecipeItems} from '@api';
import {handleTotals} from '@utils';

type Food = Tables<'foods'>;

type RecipesType = {
  items: AddedItem[];
  addItem: (item: Food, quantity: number) => void;
  deleteItem: (id: string) => void;
  addRecipe: (name: string, serving: number, serv_unit: string) => void;
};

const RecipesContext = createContext<RecipesType>({
  items: [],
  addItem: () => {},
  deleteItem: () => {},
  addRecipe: () => {},
});

const RecipesProvider = ({children}: PropsWithChildren) => {
  const [items, setItems] = useState<AddedItem[]>([]);

  const {mutate: addRecipeToDb} = useInsertRecipe();
  const {mutate: addRecipeItems} = useInsertRecipeItems();

  function generateRandomId() {
    const randomDecimal = Math.random();

    const maxIdValue = 1000; // Example: Maximum ID value of 1000
    return Math.floor(randomDecimal * maxIdValue);
  }

  const addItem = (food: Food, quantity: number) => {
    const newItem: AddedItem = {
      id: generateRandomId(),
      food,
      food_id: food.id,
      quantity,
    };
    setItems([newItem, ...items]);
  };

  const deleteItem = (id: string) => {
    const shallow = [...items];
    const filteredData = shallow.filter(item => String(item.food.id) !== id);
    setItems(filteredData);
  };

  const addRecipe = (name: string, serving: number, serv_unit: string) => {
    addRecipeToDb(
      {
        name,
        serving,
        serv_unit,
        tCalories: handleTotals(items)?.calories,
        tCarbs: handleTotals(items)?.carbs,
        tProtein: handleTotals(items)?.protein,
        tSodium: handleTotals(items)?.sodium,
        tFat: handleTotals(items)?.fat,
        tFibre: handleTotals(items)?.fibre,
      },
      {
        onSuccess: saveRecipeItems,
        onError: e => console.log('ERROR INSERT RECIPE =>>', e),
      },
    );
  };

  const saveRecipeItems = (recipe: Tables<'recipes'>) => {
    const recipeItems = items.map(ri => ({
      food_id: ri.food_id,
      quantity: ri.quantity,
      recipe_id: recipe.id,
    }));

    addRecipeItems(recipeItems, {
      onSuccess: () => console.log('DONE ADDING'),
      onError: e => console.log('ERROR INSERT RECIPE ITEM=>>', e),
    });
  };

  return (
    <RecipesContext.Provider
      value={{
        items,
        addItem,
        deleteItem,
        addRecipe,
      }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
export const useRecipes = () => useContext(RecipesContext);
