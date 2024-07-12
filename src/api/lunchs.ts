import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
import {supabase} from '@services';
import {listsStore} from '@stores';

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
  const user_id = session?.user.id;
  const {setLunchs} = listsStore();

  return useQuery({
    queryKey: ['lunchs', {userId: user_id}],
    queryFn: async () => {
      if (!user_id) {
        return null;
      }

      const {data, error} = await supabase
        .from('lunchs')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      console.log('GET LUNCHS API CALLED');
      setLunchs(data);
      return data;
    },
  });
};

export const useUpdateLunch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      userInput,
    }: {
      id: number;
      userInput: InsertTables<'lunchs'>;
    }) {
      const {data, error} = await supabase
        .from('lunchs')
        .update(userInput)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess({user_id}) {
      await queryClient.invalidateQueries({
        queryKey: ['lunchs', {userId: user_id}],
      });
    },
  });
};
