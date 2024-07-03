import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext} from 'react';
import {Tables, AddedItem} from '@types';
import {useInsertRecipe, useInsertRecipeItems} from '@api';

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
    const handleTotals = items?.reduce(
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

    addRecipeToDb(
      {
        name,
        serving,
        serv_unit,
        tCalories: handleTotals?.calories,
        tCarbs: handleTotals?.carbs,
        tProtein: handleTotals?.protein,
        tSodium: handleTotals?.sodium,
        tFat: handleTotals?.fat,
        tFibre: handleTotals?.fibre,
      },
      {
        onSuccess: saveRecipeItems,
        onError: e => console.log('ERROR INSERT RECIPE =>>', e),
      },
    );
  };

  const saveRecipeItems = (recipe: Tables<'recipes'>) => {
    console.log('RECIPE TO MAP =>>', recipe);
    const recipeItems = items.map(ri => ({
      food_id: ri.food_id,
      quantity: ri.quantity,
      recipe_id: recipe.id,
    }));

    console.log('recipeItems MAPPED=>>', recipeItems);

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
