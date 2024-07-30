import {useMutation, useQueryClient} from '@tanstack/react-query';
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

export const useDeleteLunchItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(itemIds: number[]) {
      const {data, error} = await supabase
        .from('lunch_items')
        .delete()
        .in('id', itemIds)
        .select();

      if (error) {
        throw new Error(`Error deleting lunch items: ${error.message}`);
      }

      return data;
    },
    onSuccess: data => {
      const affectedLunchIds = [...new Set(data.map(item => item.lunch_id))];

      affectedLunchIds.forEach((lunchId, id) => {
        queryClient
          .invalidateQueries({queryKey: ['lunchs', id]})
          .then(() => {});
        queryClient
          .invalidateQueries({queryKey: ['lunch_items', lunchId]})
          .then(() => {});
      });
    },
  });
};
