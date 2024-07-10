import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useAuth} from '@providers';
import {PieChart} from 'react-native-gifted-charts';
import {useGetFoodsById, useMyRecipesList} from '@api';
import {useLists} from '../../providers/ListsProvider.tsx';
import {Calendar} from '@components';
import {Colours} from '@constants';
import {calendarStore} from '@stores';

const Dashboard = () => {
  const data = [{value: 50}, {value: 80}, {value: 90}];
  const {userLogOut} = useAuth();
  const {data: ingredients} = useGetFoodsById();
  const {data: recipes} = useMyRecipesList();
  const {addLunchItem, lunchItems, addLunch, removeLunchItem} = useLists();
  const {date, setDate} = calendarStore();
  console.log('STORE =>', date);
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
    addLunchItem(null, rec, null, rec.serving);
  };

  const remove = () => {
    removeLunchItem(String(662));
  };

  const dates = () => {
    setDate(date.subtract(1, 'day'));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
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

        <Pressable onPress={remove}>
          <Text>REMOVE FROM LIST</Text>
        </Pressable>

        <Pressable onPress={dates}>
          <Text>DATE</Text>
        </Pressable>

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
