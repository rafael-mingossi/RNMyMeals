import {useMutation, useQueryClient} from '@tanstack/react-query';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertDinnerItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<'dinner_items'>[]) {
      const {data, error} = await supabase
        .from('dinner_items')
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useDeleteDinnerItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(itemIds: number[]) {
      const {data, error} = await supabase
        .from('dinner_items')
        .delete()
        .in('id', itemIds)
        .select();

      if (error) {
        throw new Error(`Error deleting dinner items: ${error.message}`);
      }

      return data;
    },
    onSuccess: data => {
      const affectedLunchIds = [...new Set(data.map(item => item.dinner_id))];

      affectedLunchIds.forEach((lunchId, id) => {
        queryClient
          .invalidateQueries({queryKey: ['dinners', id]})
          .then(() => {});
        queryClient
          .invalidateQueries({queryKey: ['dinner_items', lunchId]})
          .then(() => {});
      });
    },
  });
};
