import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@services';

export const useFoodsList = () => {
  return useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const {data, error} = await supabase.from('foods').select('*');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useAddFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(userInput: any) {
      console.log('HERE');
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

      return data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['foods']});
    },
  });
};
