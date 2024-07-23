import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
import {supabase} from '@services';
import {listsStore} from '@stores';

export const useInsertBreakfast = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(userInput: InsertTables<'breakfasts'>) {
      const {data, error} = await supabase
        .from('breakfasts')
        .insert({...userInput, user_id: userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['breakfasts']});
    },
  });
};

export const useBreakfastDetails = (id: number) => {
  return useQuery({
    queryKey: ['breakfasts', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const {data, error} = await supabase
        .from('breakfasts')
        .select('*, breakfast_items(*, foods(*), recipes(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMyBreakfastList = () => {
  const {session} = useAuth();
  const user_id = session?.user.id;
  const {setBreakfasts} = listsStore();

  return useQuery({
    queryKey: ['breakfasts', {userId: user_id}],
    queryFn: async () => {
      if (!user_id) {
        return null;
      }

      const {data, error} = await supabase
        .from('breakfasts')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      console.log('GET BREAKIES API CALLED');
      setBreakfasts(data);
      return data;
    },
  });
};

export const useUpdateBreakfast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      userInput,
    }: {
      id: number;
      userInput: InsertTables<'breakfasts'>;
    }) {
      const {data, error} = await supabase
        .from('breakfasts')
        .update(userInput)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess({user_id, id}) {
      await queryClient.invalidateQueries({
        queryKey: ['breakfasts', {userId: user_id}],
      });
      await queryClient.invalidateQueries({
        queryKey: ['breakfasts', id],
      });
    },
  });
};
