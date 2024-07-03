import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './ingredient.styles.ts';
import {FoodsType} from '@types';
import {useRecipes} from '@providers';
import {hS} from '@utils';
import {Colours} from '@constants';
import {Icon} from 'react-native-paper';

type IngredientProp = {
  item: FoodsType;
  onPress?: () => void;
};

const Ingredient = ({item, onPress}: IngredientProp) => {
  const {items} = useRecipes();

  const checkAddedItem = () => {
    return items.some(i => String(i.food.id).includes(String(item.id)));
  };
  return (
    <TouchableOpacity key={item.id} style={styles.wrapper} onPress={onPress}>
      <View style={styles.left}>
        <Image source={{uri: item.food_img}} style={styles.img} />
        <View>
          <Text style={styles.title}>{item.label}</Text>
          <Text style={styles.label}>{item.calories} cals</Text>
        </View>
      </View>
      {checkAddedItem() ? (
        <Icon size={hS(25)} source={'check'} color={Colours.green} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Ingredient;
