import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {createContext} from 'react';
import {Tables} from '@types';

type Food = Tables<'foods'>;

type FilteredItemsType = {
  filteredFoodsContext: Food[];
  filteredRecipesContext: Food[];
  handleFilterFoodsContext: (item: Food[]) => void;
  handleFilterRecipesContext: (item: Food[]) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const FilteredItemsContext = createContext<FilteredItemsType>({
  filteredFoodsContext: [],
  filteredRecipesContext: [],
  handleFilterFoodsContext: () => {},
  handleFilterRecipesContext: () => {},
  searchQuery: '',
  setSearchQuery: (prevState: SetStateAction<string>) => prevState,
});

const FilteredItemsProvider = ({children}: PropsWithChildren) => {
  const [filteredFoodsContext, setFilteredFoodsContext] = useState<Food[]>([]);
  const [filteredRecipesContext, setFilteredRecipesContext] = useState<Food[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterFoodsContext = (item: Food[]) => {
    setFilteredFoodsContext(item);
  };

  const handleFilterRecipesContext = (item: Food[]) => {
    setFilteredRecipesContext(item);
  };

  return (
    <FilteredItemsContext.Provider
      value={{
        filteredFoodsContext,
        filteredRecipesContext,
        handleFilterFoodsContext,
        handleFilterRecipesContext,
        searchQuery,
        setSearchQuery,
      }}>
      {children}
    </FilteredItemsContext.Provider>
  );
};

export default FilteredItemsProvider;
export const useFiltered = () => useContext(FilteredItemsContext);
