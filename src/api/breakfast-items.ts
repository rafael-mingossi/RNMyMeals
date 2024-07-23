import {useMutation, useQueryClient} from '@tanstack/react-query';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertBreakfastItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<'breakfast_items'>[]) {
      const {data, error} = await supabase
        .from('breakfast_items')
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useDeleteBreakfastItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(itemIds: number[]) {
      const {data, error} = await supabase
        .from('breakfast_items')
        .delete()
        .in('id', itemIds)
        .select();

      if (error) {
        throw new Error(`Error deleting lunch items: ${error.message}`);
      }

      return data;
    },
    onSuccess: data => {
      const affectedLunchIds = [
        ...new Set(data.map(item => item.breakfast_id)),
      ];

      affectedLunchIds.forEach((lunchId, id) => {
        queryClient
          .invalidateQueries({queryKey: ['breakfasts', id]})
          .then(() => {});
        queryClient
          .invalidateQueries({queryKey: ['breakfast_items', lunchId]})
          .then(() => {});
      });
    },
  });
};
