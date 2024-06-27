import {Tables} from './database.types.ts';

type Food = Tables<'foods'>;

export type SingleFoodType = Food & {checked?: boolean};
