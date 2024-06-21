export type Food = {
  calories: number;
  carbs: number;
  checked: boolean;
  created_at: string;
  fat: number;
  fibre: number;
  food_img: string;
  id: number;
  label: 'Zzz';
  protein: number;
  serv_size: number;
  serv_unit: string;
  sodium: number;
  user_id: string;
};

export type Recipes = {
  id: number;
  food: Food;
  quantity: number;
};
