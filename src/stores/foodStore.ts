import {create, StateCreator, StoreApi} from 'zustand';
import {Tables} from '@types';

interface FoodState {
  foods: Food[];
  setFoods: (newFoods: Food[]) => void;
  deleteFood: (itemId: number) => void;
}

type Food = Tables<'foods'>;

const createFoodStore: StateCreator<FoodState> = (set, get) => ({
  foods: [],
  setFoods: (newFoods: Food[]) => set(() => ({foods: newFoods})),
  deleteFood: itemId =>
    set(state => ({
      foods: state.foods.filter(item => item.id !== itemId),
    })),
});

const foodStoreRootSlice = (
  set: (
    partial:
      | FoodState
      | Partial<FoodState>
      | ((state: FoodState) => FoodState | Partial<FoodState>),
    replace?: boolean | undefined,
  ) => void,
  get: () => FoodState,
  api: StoreApi<FoodState>,
) => ({...createFoodStore(set, get, api)});

export const foodStore = create(foodStoreRootSlice);
