import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {createContext} from 'react';
import {Tables} from '@types';
import {foodStore, recipeStore} from '@stores';
import Recipes from '../screens/Recipes';

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
  const {foods} = foodStore();
  const {recipes} = recipeStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterFoodsContext = (item: Food[]) => {
    setFilteredFoodsContext(item);
  };

  const filterFoods = () => {
    const filtered: Food[] | undefined = foods?.filter(item =>
      item.label.includes(searchQuery),
    );

    handleFilterFoodsContext(filtered);
  };

  const handleFilterRecipesContext = (item: Food[]) => {
    setFilteredRecipesContext(item);
  };

  const filterRecipes = () => {
    const filtered: Recipes[] | undefined = recipes?.filter(item =>
      item?.name?.includes(searchQuery),
    );

    const newFilteredArray = filtered?.map(item => ({
      calories: item.tCalories,
      carbs: item.tCarbs,
      created_at: item.created_at,
      fat: item.tFat,
      fibre: item.tFibre,
      food_img:
        'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/default_food.png',
      id: item.id,
      label: item.name!,
      protein: item.tProtein,
      serv_size: item.serving!,
      serv_unit: item.serv_unit!,
      sodium: item.tSodium,
      user_id: item.user_id!,
    }));

    handleFilterRecipesContext(newFilteredArray);
  };

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, recipes]);

  useEffect(() => {
    filterFoods();
  }, [searchQuery, foods]);

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
