import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useAuth} from '@providers';
import {PieChart} from 'react-native-gifted-charts';
import {useGetFoodsById, useLunchDetails, useMyRecipesList} from '@api';
import {useLists} from '../../providers/ListsProvider.tsx';

const Dashboard = () => {
  const data = [{value: 50}, {value: 80}, {value: 90}];
  const {userLogOut} = useAuth();
  const {data: ingredients} = useGetFoodsById();
  const {data: recipes} = useMyRecipesList();
  const {addLunchItem, lunchItems, addLunch} = useLists();
  // const {data: details} = useLunchDetails(3);
  // console.log('LUNCH', lunchItems);
  // console.log('LUNCH LENGTH =>>', lunchItems?.length);
  // console.log(
  //   'LUNCH REC =>',
  //   lunchItems.map(item => {
  //     return item.recipe;
  //   }),
  // );
  // console.log(
  //   'LUNCH FOOD =>',
  //   lunchItems.map(item => {
  //     return item.food;
  //   }),
  // );
  // console.log('LU =>', details?.lunch_items);
  // const getInfo = () => {
  //   if (isLoading || !ingredients?.length) {
  //     return;
  //   }
  //   setFoods(ingredients);
  //   console.log('ONE MORE CALL TO THE API');
  // };
  //
  // useEffect(() => {
  //   getInfo();
  // }, [isLoading]);
  const foo = {
    calories: 250,
    carbs: 3,
    created_at: '2024-06-27T23:21:16.485825+00:00',
    fat: 2,
    fibre: 0,
    food_img:
      'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/ef8a9472-c96e-477e-8f75-27636da5d500.png',
    id: 53,
    label: 'Xup',
    protein: 4,
    serv_size: 20,
    serv_unit: 'G',
    sodium: 5,
    user_id: 'f5072b71-3672-47e0-bd14-a0a0cb4b2a85',
  };

  const rec = {
    created_at: '2024-06-28T21:34:01.763156+00:00',
    id: 7,
    img: null,
    name: 'X Z 22',
    serv_unit: 'serv',
    serving: 1,
    tCalories: 100,
    tCarbs: 7,
    tFat: 10,
    tFibre: 2,
    tProtein: 7,
    tSodium: 2,
    user_id: 'f5072b71-3672-47e0-bd14-a0a0cb4b2a85',
  };

  const handleAdd = () => {
    addLunchItem(null, rec, null, 2);
  };

  const handleAddL = () => {
    addLunch();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Pressable
          onPress={async () => {
            userLogOut();
          }}>
          <Text>DASH</Text>
        </Pressable>
        <Pressable onPress={handleAdd}>
          <Text>ADD</Text>
        </Pressable>
        <Pressable onPress={handleAddL}>
          <Text>ADD TO DB</Text>
        </Pressable>

        {/*<Calendar />*/}

        <PieChart data={data} donut />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Dashboard;
