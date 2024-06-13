export type FoodsType = {
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

export type SingleFoodType = FoodsType & {checked?: boolean};
