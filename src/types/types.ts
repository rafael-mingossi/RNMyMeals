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

export type MealTypes = 'breakie' | 'lunch' | 'snack' | 'dinner';

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
