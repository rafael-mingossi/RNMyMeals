import {useMutation} from '@tanstack/react-query';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertLunchItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<'lunch_items'>[]) {
      const {data, error} = await supabase
        .from('lunch_items')
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
