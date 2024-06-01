import React, {FC, useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {Colours} from '@constants';
import {TextInput} from 'react-native-paper';
import styles from './addFood.styles.ts';
import {ButtonText} from '@components';
import {AddFoodStack} from '@config';

const AddFood: FC<AddFoodStack> = ({navigation}) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [serving, setServing] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        <StatusBar backgroundColor={Colours.green} />
        <View>
          <TextInput
            label="Food Name"
            value={foodName}
            onChangeText={val => setFoodName(val)}
          />
          <Text style={styles.subLabel}>
            Choose a name for the food you want to log
          </Text>
        </View>

        <View>
          <TextInput
            label="Food Calories, (Cal)"
            value={calories}
            onChangeText={val => setCalories(val)}
          />
          <Text style={styles.subLabel}>
            Enter the value correspondent in Calories
          </Text>
        </View>

        <View>
          <TextInput
            label="Serving Size, (grams)"
            value={serving}
            onChangeText={val => setServing(val)}
          />
          <Text style={styles.subLabel}>
            Serving size in grams to be used in the calculation
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Cancel'} onPress={() => navigation.goBack()} />

        <ButtonText
          children={'Next'}
          disabled={!foodName || !calories || !serving}
          onPress={() =>
            navigation.navigate('AddNutrients', {
              foodName,
              calories,
              serving,
            })
          }
        />
      </View>
    </View>
  );
};

export default AddFood;
