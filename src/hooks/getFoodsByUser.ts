import {useEffect, useState} from 'react';
import {getFoodsById} from '@api';

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

export const getFoodsByUser = () => {
  const [foods, setFoods] = useState<FoodsType[]>([]);

  const {data, error, isLoading} = getFoodsById();

  // useEffect(() => {
  //   if (data && !isLoading) {
  //     setFoods(data);
  //   }
  // }, []);

  return {foods, isLoading};
};
