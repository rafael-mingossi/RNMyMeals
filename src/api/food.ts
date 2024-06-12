import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@services';
import {useAuth} from '@providers';
import {foodStore} from '../stores/foodStore.ts';

export function useFoods() {
  const {foods, setFoods, deleteFood} = foodStore();
  const {session} = useAuth();

  const getFoodsById = async () => {
    const id = session?.user.id;

    return useQuery({
      queryKey: ['foods', {userId: id}],
      queryFn: async () => {
        if (!id) return null;

        const {data, error} = await supabase
          .from('foods')
          .select('*')
          .eq('user_id', id)
          .order('created_at', {ascending: false});

        if (error) {
          throw new Error(error.message);
        }
        setFoods(data);
        return data;
      },
    });
  };

  const useAddFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
      async mutationFn(userInput: any) {
        const {data, error} = await supabase
          .from('foods')
          .insert({
            protein: userInput.protein,
            carbs: userInput.carbs,
            fat: userInput.fat,
            calories: userInput.calories,
            fibre: userInput.fibre,
            sodium: userInput.sodium,
            serv_size: userInput.serv_size,
            serv_unit: userInput.serv_unit,
            label: userInput.label,
            food_img: userInput.food_img,
            user_id: userInput.user_id,
          })
          .single();

        if (error) {
          throw new Error(error.message);
        }
        console.log('API ADDED FOOD ==>>', data);
        return data;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['foods']});
      },
    });
  };

  const useUpdateFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
      async mutationFn(userInput: any) {
        const {data, error} = await supabase
          .from('foods')
          .update({
            protein: userInput.protein,
            carbs: userInput.carbs,
            fat: userInput.fat,
            calories: userInput.calories,
            fibre: userInput.fibre,
            sodium: userInput.sodium,
            serv_size: userInput.serv_size,
            serv_unit: userInput.serv_unit,
            label: userInput.label,
            food_img: userInput.food_img,
            user_id: userInput.user_id,
          })
          .eq('id', userInput.id)
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      },
      async onSuccess({id}) {
        await queryClient.invalidateQueries({queryKey: ['foods']});
        await queryClient.invalidateQueries({queryKey: ['foods', id]});
      },
    });
  };

  const useDeleteFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
      async mutationFn(id: number) {
        const {error} = await supabase.from('foods').delete().eq('id', id);

        deleteFood(id);

        if (error) {
          throw new Error(error.message);
        }
      },

      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['foods']});
      },
    });
  };

  return {foods, getFoodsById, useAddFood, useUpdateFood, useDeleteFood};
}
