import {Tables} from './database.types.ts';

type Food = Tables<'foods'>;
type Recipes = Tables<'recipes'>;

export type SingleFoodType = Food & {checked?: boolean};
export type SingleRecipeType = Recipes & {checked?: boolean};
