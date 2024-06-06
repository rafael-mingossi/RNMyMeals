import React, {FC, useState} from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {Colours} from '@constants';
import {ButtonText, TextInputLabel} from '@components';
import {AddNutrientsStack} from '@config';
import {useAddFood} from '@api';
import styles from './addNutrients.styles.ts';
import {useAuth} from '@providers';

type ErrorsType = {
  fat: boolean;
  carbs: boolean;
  protein: boolean;
};

type FormType = {
  fat: string;
  carbs: string;
  protein: string;
  sodium: string;
  fibre: string;
};

const AddNutrients: FC<AddNutrientsStack> = ({navigation, route}) => {
  const {foodName, calories, serving, unit, img} = route?.params;
  const {mutate: addFood} = useAddFood();
  const {session} = useAuth();
  const [formData, setFormData] = useState<FormType>({
    fat: '',
    carbs: '',
    protein: '',
    sodium: '',
    fibre: '',
  });
  const [errors, setErrors] = useState<ErrorsType>({
    fat: false,
    carbs: false,
    protein: false,
  });

  const temp_img = require('../../assets/images/default_food.png');

  if (!foodName || !calories || !serving || !unit) {
    navigation.goBack();
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const validateForm = () => {
    setErrors({
      fat: false,
      carbs: false,
      protein: false,
    });
    if (!formData.fat || !formData.carbs || !formData.protein) {
      setErrors({...errors, fat: true, carbs: true, protein: true});
      return false;
    }
    return true;
  };

  const handleSubmitForm = () => {
    if (!validateForm()) {
      return;
    }

    addFood(
      {
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
        calories,
        fibre: formData.fibre || 0,
        sodium: formData.sodium || 0,
        serv_size: serving,
        serv_unit: unit,
        label: foodName,
        food_img: img || temp_img,
        user_id: session?.user.id,
      },
      {
        onSuccess: () => {
          navigation.navigate('Foods');
        },
        onError: e => {
          console.log('Error =>>', e);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.topWrapper}>
        <Image source={img ? {uri: img} : temp_img} style={styles.foodImg} />
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
        <TextInputLabel
          label={'Total Fat'}
          value={formData.fat}
          returnKeyType={'done'}
          onChangeText={val => handleInputChange('fat', val)}
          error={errors.fat}
          onSubmitEditing={() => {}}
        />
        <TextInputLabel
          label={'Total Carbs'}
          value={formData.carbs}
          returnKeyType={'done'}
          onChangeText={val => handleInputChange('carbs', val)}
          error={errors.carbs}
          onSubmitEditing={() => {}}
        />
        <TextInputLabel
          label={'Protein'}
          value={formData.protein}
          returnKeyType={'done'}
          onChangeText={val => handleInputChange('protein', val)}
          error={errors.protein}
          onSubmitEditing={() => {}}
        />
        <TextInputLabel
          label={'Sodium'}
          value={formData.sodium}
          returnKeyType={'done'}
          onChangeText={val => handleInputChange('sodium', val)}
          onSubmitEditing={() => {}}
        />
        <TextInputLabel
          label={'Fibre'}
          value={formData.fibre}
          returnKeyType={'done'}
          onChangeText={val => handleInputChange('fibre', val)}
          onSubmitEditing={() => {}}
        />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Submit'} onPress={() => handleSubmitForm()} />
      </View>
    </View>
  );
};

export default AddNutrients;
