import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useFoodsById} from '@api';
import RemoteImage from '../../components/RemoteImg';

const temp_img =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
const Foods = () => {
  const {data: foods, isLoading, error} = useFoodsById();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  return (
    <SafeAreaView>
      <Text>FOODS</Text>
      <FlatList
        data={foods}
        renderItem={({item}) => (
          <View>
            <Text>Name: {item.label}</Text>
            <Text>Protein: {item.protein}</Text>
            <RemoteImage
              path={item.food_img}
              fallback={temp_img}
              style={{width: 100, height: 80}}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Foods;
