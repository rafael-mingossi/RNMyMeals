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
import {Calendar} from '@components';
import {Colours} from '@constants';
import styles from './dashboard.styles.ts';

const Dashboard = () => {
  const data = [{value: 50}, {value: 80}, {value: 90}];
  const {userLogOut} = useAuth();
  const {data: ingredients} = useGetFoodsById();
  const {data: recipes} = useMyRecipesList();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      <ScrollView>
        <Pressable
          onPress={async () => {
            userLogOut();
          }}>
          <Text>DASH</Text>
        </Pressable>

        <PieChart data={data} donut />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
