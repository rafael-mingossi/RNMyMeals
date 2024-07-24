import {useMutation, useQueryClient} from '@tanstack/react-query';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertSnackItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<'snack_items'>[]) {
      const {data, error} = await supabase
        .from('snack_items')
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useDeleteSnackItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(itemIds: number[]) {
      const {data, error} = await supabase
        .from('snack_items')
        .delete()
        .in('id', itemIds)
        .select();

      if (error) {
        throw new Error(`Error deleting snack items: ${error.message}`);
      }

      return data;
    },
    onSuccess: data => {
      const affectedLunchIds = [...new Set(data.map(item => item.snack_id))];

      affectedLunchIds.forEach((lunchId, id) => {
        queryClient
          .invalidateQueries({queryKey: ['snacks', id]})
          .then(() => {});
        queryClient
          .invalidateQueries({queryKey: ['snack_items', lunchId]})
          .then(() => {});
      });
    },
  });
};
