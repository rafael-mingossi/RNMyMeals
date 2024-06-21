import React, {PropsWithChildren, useContext} from 'react';
import {createContext} from 'react';
import {Food, Recipes} from '@types';

type RecipesType = {
  items: Recipes[];
  addItem: (item: Food) => void;
};

const RecipesContext = createContext<RecipesType>({
  items: [],
  addItem: () => {},
});

const RecipesProvider = ({children}: PropsWithChildren) => {
  return (
    <RecipesContext.Provider
      value={{
        items: [],
        addItem: (food: Food) => {
          console.log('CART =>>', food);
        },
      }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
export const useRecipes = () => useContext(RecipesContext);
