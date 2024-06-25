import React, {PropsWithChildren, useContext, useState} from 'react';
import {createContext} from 'react';
import {Recipes, SingleFoodType} from '@types';
import {v4 as uuidv4} from 'uuid';

type RecipesType = {
  items: Recipes[];
  addItem: (item: SingleFoodType, quantity: number) => void;
};

const RecipesContext = createContext<RecipesType>({
  items: [],
  addItem: () => {},
});

const RecipesProvider = ({children}: PropsWithChildren) => {
  const [items, setItems] = useState<Recipes[]>([]);

  const addItem = (food: SingleFoodType, quantity: number) => {
    const newItem: Recipes = {
      id: uuidv4(),
      food,
      food_id: food.id,
      quantity,
    };
    console.log('NEW ITEM =>>', newItem);
    setItems([newItem, ...items]);
  };

  return (
    <RecipesContext.Provider
      value={{
        items,
        addItem,
      }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
export const useRecipes = () => useContext(RecipesContext);
