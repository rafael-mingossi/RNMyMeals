import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useFoodsById} from '@api';

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
            {item.food_img.toString().includes('file') ? (
              <Image
                source={{uri: item.food_img}}
                style={{width: 100, height: 80}}
              />
            ) : (
              <Image
                source={item.food_img.toString()}
                style={{width: 100, height: 80}}
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Foods;
