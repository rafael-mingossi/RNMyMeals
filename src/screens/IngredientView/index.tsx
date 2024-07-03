import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {IngredientsViewPropsNavigation} from '@config';
import styles from './ingredientView.styles.ts';
import {TextInput} from 'react-native-paper';
import {Colours} from '@constants';
import {PieChart} from 'react-native-gifted-charts';
import {hS} from '@utils';
import {ButtonText, MacrosChart} from '@components';
import {useRecipes} from '@providers';

const IngredientView = ({
  route,
  navigation,
}: IngredientsViewPropsNavigation) => {
  const prop = route?.params?.item;
  const {addItem} = useRecipes();
  const [quantity, setQuantity] = useState<string>('');
  const data = [
    {value: prop?.fat, color: Colours.midOrange},
    {value: prop?.protein, color: Colours.darkYellow},
    {value: prop?.carbs, color: Colours.midGreen},
  ];

  const handleAddIngredient = () => {
    const shallow = {
      ...prop,
      calories: (Number(quantity) * prop?.calories) / prop?.serv_size,
      carbs: (Number(quantity) * prop?.carbs) / prop?.serv_size,
      fat: (Number(quantity) * prop?.fat) / prop?.serv_size,
      fibre: (Number(quantity) * prop?.fibre!) / prop?.serv_size,
      protein: (Number(quantity) * prop?.protein) / prop?.serv_size,
      sodium: (Number(quantity) * prop?.sodium!) / prop?.serv_size,
    };

    addItem(
      quantity ? shallow : prop,
      quantity ? Number(quantity) : prop?.serv_size,
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View>
          <Image source={{uri: prop.food_img!}} style={styles.img} />
          <Text style={styles.foodName}>{prop?.label}</Text>
        </View>

        <View style={styles.quantityWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              mode="flat"
              textColor={Colours.blue}
              underlineColor={Colours.blue}
              activeUnderlineColor={Colours.blue}
              style={styles.input}
              value={quantity}
              keyboardType={'numeric'}
              onChangeText={setQuantity}
            />
            <Text style={styles.servUnit}>{prop?.serv_unit}</Text>
          </View>
          <Text style={styles.calories}>
            {!quantity
              ? prop?.calories
              : ((Number(quantity) * prop?.calories) / prop?.serv_size).toFixed(
                  2,
                )}{' '}
            <Text style={styles.cals}>cals</Text>
          </Text>
        </View>
        <Text style={styles.originalServ}>
          Food Serving: {prop?.serv_size} {prop?.serv_unit}
        </Text>
        <View style={styles.line} />
        <MacrosChart
          hasTitle
          data={data}
          protein={prop?.protein}
          carbs={prop?.carbs}
          fat={prop?.fat}
        />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Add Item'} onPress={handleAddIngredient} />
      </View>
    </View>
  );
};

export default IngredientView;
