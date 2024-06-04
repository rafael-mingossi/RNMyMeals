import React, {FC, useState} from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {Colours} from '@constants';
import {ButtonText} from '@components';
import {AddNutrientsStack} from '@config';
import styles from './addNutrients.styles.ts';
import {TextInput} from 'react-native-paper';

const AddNutrients: FC<AddNutrientsStack> = ({navigation, route}) => {
  const {foodName, calories, serving, unit} = route?.params;
  const [formData, setFormData] = useState({
    fat: '',
    carbs: '',
  });

  const temp_img = require('../../assets/images/default_food.png');

  if (!foodName || !calories || !serving || !unit) {
    navigation.goBack();
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.topWrapper}>
        <Image source={temp_img} style={styles.foodImg} />
        {/*<View style={styles.imgWrapper}>*/}
        {/*</View>*/}
        <View style={styles.paramsWrapper}>
          <Text style={styles.name}>{foodName}</Text>
          <Text style={styles.serving}>
            Serving: {serving} ({unit})
          </Text>
          <Text style={styles.serving}>Calories: {calories}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Total Fat</Text>
          <TextInput
            mode={'flat'}
            value={formData.fat}
            enterKeyHint={'next'}
            returnKeyType={'done'}
            style={styles.input}
            onChangeText={val => handleInputChange('fat', val)}
            // right={
            //   errors.name ? (
            //     <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
            //   ) : null
            // }
            onSubmitEditing={() => {}}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Total Carbs</Text>
          <TextInput
            mode={'flat'}
            value={formData.fat}
            enterKeyHint={'next'}
            returnKeyType={'done'}
            style={styles.input}
            onChangeText={val => handleInputChange('carbs', val)}
            // right={
            //   errors.name ? (
            //     <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
            //   ) : null
            // }
            onSubmitEditing={() => {}}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Cancel'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Next'} onPress={() => {}} />
      </View>
    </View>
  );
};

export default AddNutrients;
