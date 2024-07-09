import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
import {supabase} from '@services';

export const useInsertLunch = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(userInput: InsertTables<'lunchs'>) {
      const {data, error} = await supabase
        .from('lunchs')
        .insert({...userInput, user_id: userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['lunchs']});
    },
  });
};

export const useLunchDetails = (id: number) => {
  return useQuery({
    queryKey: ['lunchs', id],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('lunchs')
        .select('*, lunch_items(*, foods(*), recipes(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMyLunchsList = () => {
  const {session} = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['lunchs', {userId: id}],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const {data, error} = await supabase
        .from('lunchs')
        .select('*')
        .eq('user_id', id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      console.log('GET LUNCHS API CALLED');
      return data;
    },
  });
};
