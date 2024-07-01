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
import {useGetFoodsById, useMyRecipesList} from '@api';

const Dashboard = () => {
  const data = [{value: 50}, {value: 80}, {value: 90}];
  const {userLogOut} = useAuth();
  const {data: ingredients} = useGetFoodsById();
  const {data: recipes} = useMyRecipesList();

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Pressable
          onPress={async () => {
            userLogOut();
          }}>
          <Text>DASH</Text>
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
