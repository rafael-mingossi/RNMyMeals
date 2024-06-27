import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@services';
import {useAuth} from '@providers';
import {InsertTables} from '@types';
// import {InsertTables, UpdateTables} from '@types';

// export const useAdminOrdersList = ({ archived = false }) => {
//   const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
//
//   return useQuery({
//     queryKey: ["recipes", { archived }],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("recipes")
//         .select("*")
//         .in("status", statuses)
//         .order("created_at", { ascending: false });
//
//       if (error) {
//         throw new Error(error.message);
//       }
//
//       return data;
//     },
//   });
// };

export const useMyRecipesList = () => {
  const {session} = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['recipes', {userId: id}],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const {data, error} = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', id)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useRecipeDetails = (id: number) => {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('recipes')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertRecipe = () => {
  const queryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(userInput: InsertTables<'recipes'>) {
      const {data, error} = await supabase
        .from('recipes')
        .insert({...userInput, user_id: userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['recipes']});
    },
  });
};

// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     async mutationFn({
//       id,
//       userInput,
//     }: {
//       id: number;
//       userInput: UpdateTables<'recipes'>;
//     }) {
//       const {data, error} = await supabase
//         .from('recipes')
//         .update(userInput)
//         .eq('id', id)
//         .select()
//         .single();
//
//       if (error) {
//         throw new Error(error.message);
//       }
//
//       return data;
//     },
//     async onSuccess({id}) {
//       await queryClient.invalidateQueries({queryKey: ['recipes']});
//       await queryClient.invalidateQueries({queryKey: ['recipes', id]});
//     },
//   });
// };
