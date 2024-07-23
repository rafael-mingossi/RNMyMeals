import {Database, Tables} from './database.types.ts';

export type TablesType<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// export type Enums<T extends keyof Database['public']['Enums']> =
//   Database['public']['Enums'][T];

export type FoodAddedItem = {
  food_id: number | null;
  itemFood: TablesType<'foods'> | null;
  foodQuantity: number | null;
};

export type RecipeAddedItem = {
  recipe_id: number | null;
  itemRecipe: TablesType<'recipes'> | null;
  recipeQuantity: number | null;
};

export type AddedMeal = {
  id: number;
  food: FoodAddedItem | null;
  recipe: RecipeAddedItem | null;
};

export interface BaseMealItem {
  id: number;
  foodQuantity?: number | null;
  foods?: TablesType<'foods'> | null;
  recipes?: TablesType<'recipes'> | null;
  recipeQuantity?: number | null;
}

export type AddedItem = {
  id: number;
  food: TablesType<'foods'>;
  food_id: number;
  quantity: number;
};

export type ItemWithTotals = {
  created_at: string;
  dateAdded: string | null;
  id: number;
  tCalories: number | null;
  tCarbs: number | null;
  tFat: number | null;
  tFibre: number | null;
  tProtein: number | null;
  tSodium: number | null;
  user_id: string | null;
};

export type MealTypes = 'breakfast' | 'lunch';

export type LunchDetails = {
  created_at: string;
  foodQuantity: number | null;
  food_id: number | null;
  foods: TablesType<'foods'> | null;
  id: number;
  lunch_id: number | null;
  recipeQuantity: number | null;
  recipe_id: number | null;
  recipes: TablesType<'recipes'> | null;
};

export type BreakieDetails = {
  created_at: string;
  foodQuantity: number | null;
  food_id: number | null;
  foods: TablesType<'foods'> | null;
  id: number;
  breakfast_id?: number | null;
  recipeQuantity: number | null;
  recipe_id: number | null;
  recipes: TablesType<'recipes'> | null;
};

export type SnackDetails = {
  created_at: string;
  foodQuantity: number | null;
  food_id: number | null;
  foods: TablesType<'foods'> | null;
  id: number;
  snack_id?: number | null;
  recipeQuantity: number | null;
  recipe_id: number | null;
  recipes: TablesType<'recipes'> | null;
};

export type DinnerDetails = {
  created_at: string;
  foodQuantity: number | null;
  food_id: number | null;
  foods: TablesType<'foods'> | null;
  id: number;
  dinner_id?: number | null;
  recipeQuantity: number | null;
  recipe_id: number | null;
  recipes: TablesType<'recipes'> | null;
};

// THIS IS BEING USED TO EXTEND GENERICS
export type MealDetails = {
  created_at: string;
  foodQuantity: number | null;
  food_id: number | null;
  foods: TablesType<'foods'> | null;
  id: number;
  recipeQuantity: number | null;
  recipe_id: number | null;
  recipes: TablesType<'recipes'> | null;
  [key: string]: any;
};

export type Profile = {
  id: string;
  group: string;
};

export type Food = Tables<'foods'>;
export type Recipe = Tables<'recipes'>;
export type Lunchs = Tables<'lunchs'>;
export type Breakies = Tables<'breakfasts'>;
export type Snacks = Tables<'snacks'>;
export type Dinners = Tables<'dinners'>;
