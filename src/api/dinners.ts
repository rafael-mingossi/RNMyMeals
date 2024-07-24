import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
import {supabase} from '@services';
import {listsStore} from '@stores';

export const useInsertDinner = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(userInput: InsertTables<'dinners'>) {
      const {data, error} = await supabase
        .from('dinners')
        .insert({...userInput, user_id: userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['dinners']});
    },
  });
};

export const useDinnerDetails = (id: number) => {
  return useQuery({
    queryKey: ['dinners', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const {data, error} = await supabase
        .from('dinners')
        .select('*, dinner_items(*, foods(*), recipes(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMyDinnersList = () => {
  const {session} = useAuth();
  const user_id = session?.user.id;
  const {setDinners} = listsStore();

  return useQuery({
    queryKey: ['dinners', {userId: user_id}],
    queryFn: async () => {
      if (!user_id) {
        return null;
      }

      const {data, error} = await supabase
        .from('dinners')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      console.log('GET DINNERS API CALLED');
      setDinners(data);
      return data;
    },
  });
};

export const useUpdateDinner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      userInput,
    }: {
      id: number;
      userInput: InsertTables<'dinners'>;
    }) {
      const {data, error} = await supabase
        .from('dinners')
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
        queryKey: ['dinners', {userId: user_id}],
      });
      await queryClient.invalidateQueries({
        queryKey: ['dinners', id],
      });
    },
  });
};
