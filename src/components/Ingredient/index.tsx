import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './ingredient.styles.ts';
import {FoodsType} from '@types';

type IngredientProp = {
  item: FoodsType;
};

const Ingredient = ({item}: IngredientProp) => {
  return (
    <TouchableOpacity key={item.id} style={styles.wrapper}>
      <Image source={{uri: item.food_img}} style={styles.img} />
      <View>
        <Text style={styles.title}>{item.label}</Text>
        <Text style={styles.label}>{item.calories} cals</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Ingredient;
