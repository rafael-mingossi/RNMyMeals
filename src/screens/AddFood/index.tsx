import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Colours} from '@constants';

const AddFood = () => {
  return (
    <View>
      <StatusBar backgroundColor={Colours.green} />
      <Text>ADD FOOD</Text>
    </View>
  );
};

export default AddFood;
