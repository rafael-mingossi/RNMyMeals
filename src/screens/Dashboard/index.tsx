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

const Dashboard = () => {
  const data = [{value: 50}, {value: 80}, {value: 90}];
  const {userLogOut} = useAuth();
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
