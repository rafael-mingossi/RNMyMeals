import {useAuth} from '@providers';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@services';
import {InsertTables} from '@types';

export const useGetUserById = () => {
  const {session} = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['profiles', {id: id}],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('GET USER API CALLED');
      return data;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      userInput,
    }: {
      id: string;
      userInput: InsertTables<'profiles'>;
    }) {
      const {data, error} = await supabase
        .from('profiles')
        .update(userInput)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess({id}) {
      await queryClient.invalidateQueries({
        queryKey: ['profiles', {id: id}],
      });
    },
  });
};
