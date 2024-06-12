import {create, StateCreator, StoreApi} from 'zustand';

interface FoodState {
  foods: FoodsType[];
  setFoods: (newFoods: FoodsType[]) => void;
  deleteFood: (itemId: number) => void;
}

type FoodsType = {
  calories: number;
  carbs: number;
  created_at: string;
  fat: number;
  fibre: number;
  food_img: string;
  id: number;
  label: string;
  protein: number;
  serv_size: number;
  serv_unit: string;
  sodium: number;
  user_id: string;
};

const createFoodStore: StateCreator<FoodState> = (set, get) => ({
  foods: [],
  setFoods: newFoods => set({foods: newFoods}),
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
