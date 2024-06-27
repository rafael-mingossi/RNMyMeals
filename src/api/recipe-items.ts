import {useMutation} from '@tanstack/react-query';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertRecipeItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<'recipe_items'>[]) {
      const {data, error} = await supabase
        .from('recipe_items')
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
