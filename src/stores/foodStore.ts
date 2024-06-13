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
  // foods: [
  //   {
  //     calories: 6,
  //     carbs: 6,
  //     created_at: '2024-06-10T04:20:17.254274+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: 'e2d2a134-0375-4000-8565-a370f18d7ba5.png',
  //     id: 31,
  //     label: 'Fff',
  //     protein: 9,
  //     serv_size: 3,
  //     serv_unit: 'I',
  //     sodium: 3,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 6,
  //     carbs: 6,
  //     created_at: '2024-06-10T02:31:23.513042+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: '43031e6b-af38-43df-b4a9-c0ab7da5b5af.png',
  //     id: 29,
  //     label: 'Tt',
  //     protein: 6,
  //     serv_size: 6,
  //     serv_unit: 'Pl',
  //     sodium: 6,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 6,
  //     carbs: 3,
  //     created_at: '2024-06-08T04:11:42.658106+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: 'c7c7caa4-2003-4b08-9ba9-da1dfb4c7081.png',
  //     id: 25,
  //     label: 'Zzz',
  //     protein: 3,
  //     serv_size: 6,
  //     serv_unit: 'Yy',
  //     sodium: 3,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 66,
  //     carbs: 55,
  //     created_at: '2024-06-08T03:14:23.360626+00:00',
  //     fat: 6,
  //     fibre: 72,
  //     food_img: '89b4a5fc-72c0-482c-a5ce-38bd73776a68.png',
  //     id: 21,
  //     label: 'Xxxxx',
  //     protein: 33,
  //     serv_size: 66,
  //     serv_unit: 'Gr',
  //     sodium: 8,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 666,
  //     carbs: 3,
  //     created_at: '2024-06-07T00:18:14.609504+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: '2acd8610-2dbd-4dff-a805-60120fe81b14.png',
  //     id: 19,
  //     label: '6666',
  //     protein: 3,
  //     serv_size: 666,
  //     serv_unit: 'g',
  //     sodium: 3,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 22,
  //     carbs: 3,
  //     created_at: '2024-06-07T00:15:54.456166+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: '9',
  //     id: 18,
  //     label: '4444ddd',
  //     protein: 3,
  //     serv_size: 22,
  //     serv_unit: 'g',
  //     sodium: 33,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 22,
  //     carbs: 3,
  //     created_at: '2024-06-07T00:13:23.926263+00:00',
  //     fat: 3,
  //     fibre: 3,
  //     food_img: '9',
  //     id: 17,
  //     label: 'xx111',
  //     protein: 3,
  //     serv_size: 222,
  //     serv_unit: 'spoon',
  //     sodium: 3,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 22,
  //     carbs: 22,
  //     created_at: '2024-06-07T00:02:35.856635+00:00',
  //     fat: 2,
  //     fibre: 2,
  //     food_img: '14',
  //     id: 16,
  //     label: 'xx2x2',
  //     protein: 2,
  //     serv_size: 66,
  //     serv_unit: 'Gr',
  //     sodium: 2,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 6,
  //     carbs: 4,
  //     created_at: '2024-06-06T07:31:09.874164+00:00',
  //     fat: 4,
  //     fibre: 4,
  //     food_img: '14',
  //     id: 15,
  //     label: 'Xxx',
  //     protein: 44,
  //     serv_size: 55555,
  //     serv_unit: 'Grams',
  //     sodium: 4,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 11,
  //     carbs: 44,
  //     created_at: '2024-06-06T06:25:55.145721+00:00',
  //     fat: 3,
  //     fibre: 7,
  //     food_img:
  //       'file:///data/user/0/com.mymeals/cache/rn_image_picker_lib_temp_98d74e49-e753-44c6-b7cc-93b5f5a9cb1e.jpg',
  //     id: 14,
  //     label: 'Xx',
  //     protein: 4,
  //     serv_size: 33,
  //     serv_unit: 'Slice',
  //     sodium: 3,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 600,
  //     carbs: 66,
  //     created_at: '2024-06-06T06:24:19.549398+00:00',
  //     fat: 6,
  //     fibre: 4,
  //     food_img:
  //       'file:///data/user/0/com.mymeals/cache/rn_image_picker_lib_temp_50a67f0f-5f91-40c9-81ba-8b29c730e062.jpg',
  //     id: 13,
  //     label: 'Beef x',
  //     protein: 6,
  //     serv_size: 100,
  //     serv_unit: 'Grams',
  //     sodium: 6,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 1,
  //     carbs: 22,
  //     created_at: '2024-06-05T22:07:24.407971+00:00',
  //     fat: 44,
  //     fibre: 0,
  //     food_img:
  //       'file:///data/user/0/com.mymeals/cache/rn_image_picker_lib_temp_21e6dcdb-f6bf-45d4-ba9c-73dd3bd15004.jpg',
  //     id: 10,
  //     label: 'Food2',
  //     protein: 11,
  //     serv_size: 1,
  //     serv_unit: 'slice',
  //     sodium: 0,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  //   {
  //     calories: 3,
  //     carbs: 3,
  //     created_at: '2024-06-05T21:05:15.855047+00:00',
  //     fat: 3,
  //     fibre: 6,
  //     food_img: "require('../../assets/images/default_food.png')",
  //     id: 9,
  //     label: 'dd',
  //     protein: 3,
  //     serv_size: 6,
  //     serv_unit: 'Grams',
  //     sodium: 63,
  //     user_id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //   },
  // ],
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
