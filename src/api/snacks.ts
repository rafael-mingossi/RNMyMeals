import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
import {supabase} from '@services';
import {listsStore} from '@stores';

export const useInsertSnack = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(userInput: InsertTables<'snacks'>) {
      const {data, error} = await supabase
        .from('snacks')
        .insert({...userInput, user_id: userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['snacks']});
    },
  });
};

export const useSnackDetails = (id: number) => {
  return useQuery({
    queryKey: ['snacks', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const {data, error} = await supabase
        .from('snacks')
        .select('*, snack_items(*, foods(*), recipes(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMySnacksList = () => {
  const {session} = useAuth();
  const user_id = session?.user.id;
  const {setSnacks} = listsStore();

  return useQuery({
    queryKey: ['snacks', {userId: user_id}],
    queryFn: async () => {
      if (!user_id) {
        return null;
      }

      const {data, error} = await supabase
        .from('snacks')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      console.log('GET SNACKS API CALLED');
      setSnacks(data);
      return data;
    },
  });
};

export const useUpdateSnack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      userInput,
    }: {
      id: number;
      userInput: InsertTables<'snacks'>;
    }) {
      const {data, error} = await supabase
        .from('snacks')
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
        queryKey: ['snacks', {userId: user_id}],
      });
      await queryClient.invalidateQueries({
        queryKey: ['snacks', id],
      });
    },
  });
};
