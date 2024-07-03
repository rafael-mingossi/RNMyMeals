import {Database} from './database.types.ts';

export type TablesType<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// export type Enums<T extends keyof Database['public']['Enums']> =
//   Database['public']['Enums'][T];

export type AddedItem = {
  id: number;
  food: TablesType<'foods'>;
  food_id: number;
  quantity: number;
};

export type Recipe = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  recipe_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  food: TablesType<'foods'>;
  order_id: number;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
