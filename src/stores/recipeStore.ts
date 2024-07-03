import {create, StateCreator, StoreApi} from 'zustand';
import {Tables} from '@types';

interface RecipeState {
  recipes: Recipe[];
  setRecipes: (newFoods: Recipe[]) => void;
  deleteRecipe: (itemId: number) => void;
}

type Recipe = Tables<'recipes'>;

const createRecipeStore: StateCreator<RecipeState> = (set, get) => ({
  recipes: [],
  setRecipes: (newFoods: Recipe[]) => set(() => ({recipes: newFoods})),
  deleteRecipe: itemId =>
    set(state => ({
      recipes: state.recipes.filter(item => item.id !== itemId),
    })),
});

const recipeStoreRootSlice = (
  set: (
    partial:
      | RecipeState
      | Partial<RecipeState>
      | ((state: RecipeState) => RecipeState | Partial<RecipeState>),
    replace?: boolean | undefined,
  ) => void,
  get: () => RecipeState,
  api: StoreApi<RecipeState>,
) => ({...createRecipeStore(set, get, api)});

export const recipeStore = create(recipeStoreRootSlice);
