export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      breakfast_items: {
        Row: {
          breakfast_id: number | null;
          created_at: string;
          food_id: number | null;
          foodQuantity: number | null;
          id: number;
          recipe_id: number | null;
          recipeQuantity: number | null;
        };
        Insert: {
          breakfast_id?: number | null;
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Update: {
          breakfast_id?: number | null;
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'breakfast_items_breakfast_id_fkey';
            columns: ['breakfast_id'];
            isOneToOne: false;
            referencedRelation: 'breakfasts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'breakfast_items_food_id_fkey';
            columns: ['food_id'];
            isOneToOne: false;
            referencedRelation: 'foods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'breakfast_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      breakfasts: {
        Row: {
          created_at: string;
          dateAdded: string;
          id: number;
          tCalories: number | null;
          tCarbs: number | null;
          tFat: number | null;
          tFibre: number | null;
          tProtein: number | null;
          tSodium: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          dateAdded: string;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          dateAdded?: string;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'breakfasts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      dinner_items: {
        Row: {
          created_at: string;
          dinner_id: number | null;
          food_id: number | null;
          foodQuantity: number | null;
          id: number;
          recipe_id: number | null;
          recipeQuantity: number | null;
        };
        Insert: {
          created_at?: string;
          dinner_id?: number | null;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Update: {
          created_at?: string;
          dinner_id?: number | null;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'dinner_items_dinner_id_fkey';
            columns: ['dinner_id'];
            isOneToOne: false;
            referencedRelation: 'dinners';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'dinner_items_food_id_fkey';
            columns: ['food_id'];
            isOneToOne: false;
            referencedRelation: 'foods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'dinner_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      dinners: {
        Row: {
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
        Insert: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'dinners_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      foods: {
        Row: {
          calories: number;
          carbs: number;
          created_at: string;
          fat: number;
          fibre: number | null;
          food_img: string | null;
          id: number;
          label: string;
          protein: number;
          serv_size: number;
          serv_unit: string;
          sodium: number | null;
          user_id: string;
        };
        Insert: {
          calories: number;
          carbs: number;
          created_at?: string;
          fat: number;
          fibre?: number | null;
          food_img?: string | null;
          id?: number;
          label: string;
          protein: number;
          serv_size: number;
          serv_unit: string;
          sodium?: number | null;
          user_id: string;
        };
        Update: {
          calories?: number;
          carbs?: number;
          created_at?: string;
          fat?: number;
          fibre?: number | null;
          food_img?: string | null;
          id?: number;
          label?: string;
          protein?: number;
          serv_size?: number;
          serv_unit?: string;
          sodium?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_Foods_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      lunch_items: {
        Row: {
          created_at: string;
          food_id: number | null;
          foodQuantity: number | null;
          id: number;
          lunch_id: number | null;
          recipe_id: number | null;
          recipeQuantity: number | null;
        };
        Insert: {
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          lunch_id?: number | null;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Update: {
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          lunch_id?: number | null;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'lunch_items_food_id_fkey';
            columns: ['food_id'];
            isOneToOne: false;
            referencedRelation: 'foods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'lunch_items_lunch_id_fkey';
            columns: ['lunch_id'];
            isOneToOne: false;
            referencedRelation: 'lunchs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'lunch_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      lunchs: {
        Row: {
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
        Insert: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'lunchs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          cal_goal: number | null;
          dob: string | null;
          full_name: string | null;
          gender: string | null;
          height: number | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          weight: number | null;
        };
        Insert: {
          avatar_url?: string | null;
          cal_goal?: number | null;
          dob?: string | null;
          full_name?: string | null;
          gender?: string | null;
          height?: number | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          weight?: number | null;
        };
        Update: {
          avatar_url?: string | null;
          cal_goal?: number | null;
          dob?: string | null;
          full_name?: string | null;
          gender?: string | null;
          height?: number | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_items: {
        Row: {
          created_at: string;
          food_id: number;
          id: number;
          quantity: number;
          recipe_id: number;
        };
        Insert: {
          created_at?: string;
          food_id: number;
          id?: number;
          quantity?: number;
          recipe_id: number;
        };
        Update: {
          created_at?: string;
          food_id?: number;
          id?: number;
          quantity?: number;
          recipe_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_items_food_id_fkey';
            columns: ['food_id'];
            isOneToOne: false;
            referencedRelation: 'foods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      recipes: {
        Row: {
          created_at: string;
          id: number;
          img: string | null;
          name: string | null;
          serv_unit: string | null;
          serving: number | null;
          tCalories: number;
          tCarbs: number;
          tFat: number;
          tFibre: number;
          tProtein: number;
          tSodium: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          img?: string | null;
          name?: string | null;
          serv_unit?: string | null;
          serving?: number | null;
          tCalories?: number;
          tCarbs?: number;
          tFat?: number;
          tFibre?: number;
          tProtein?: number;
          tSodium?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          img?: string | null;
          name?: string | null;
          serv_unit?: string | null;
          serving?: number | null;
          tCalories?: number;
          tCarbs?: number;
          tFat?: number;
          tFibre?: number;
          tProtein?: number;
          tSodium?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      snack_items: {
        Row: {
          created_at: string;
          food_id: number | null;
          foodQuantity: number | null;
          id: number;
          recipe_id: number | null;
          recipeQuantity: number | null;
          snack_id: number | null;
        };
        Insert: {
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
          snack_id?: number | null;
        };
        Update: {
          created_at?: string;
          food_id?: number | null;
          foodQuantity?: number | null;
          id?: number;
          recipe_id?: number | null;
          recipeQuantity?: number | null;
          snack_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'snack_items_food_id_fkey';
            columns: ['food_id'];
            isOneToOne: false;
            referencedRelation: 'foods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'snack_items_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'snack_items_snack_id_fkey';
            columns: ['snack_id'];
            isOneToOne: false;
            referencedRelation: 'snacks';
            referencedColumns: ['id'];
          },
        ];
      };
      snacks: {
        Row: {
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
        Insert: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          dateAdded?: string | null;
          id?: number;
          tCalories?: number | null;
          tCarbs?: number | null;
          tFat?: number | null;
          tFibre?: number | null;
          tProtein?: number | null;
          tSodium?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'snacks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
