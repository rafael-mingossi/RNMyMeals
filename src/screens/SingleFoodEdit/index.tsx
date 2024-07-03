import React, {FC, useRef, useState} from 'react';
import {View, TextInput as TI, ScrollView, Image} from 'react-native';
import {SingleFoodEditPropsNavigation} from '@config';
import styles from './singleFoodEdit.styles.ts';
import {ButtonText, TextInputLabel} from '@components';
import {handleImagePicker, handleCamera, uploadImage} from '@utils';
import {useUpdateFood} from '@api';
import {useAuth} from '@providers';
import {supabase} from '@services';

type FormType = {
  foodName: string;
  calories: number;
  serving: number;
  unit: string;
  fat: number;
  carbs: number;
  protein: number;
  sodium: number;
  fibre: number;
};

type ErrorsType = {
  foodName: boolean;
  calories: boolean;
  serving: boolean;
  unit: boolean;
  fat: boolean;
  carbs: boolean;
  protein: boolean;
};

const SingleFoodEdit: FC<SingleFoodEditPropsNavigation> = ({
  navigation,
  route,
}) => {
  const val = route.params.item;
  const {mutate: updateFood} = useUpdateFood();
  const {session} = useAuth();
  const [formData, setFormData] = useState<FormType>({
    foodName: val.label,
    calories: val.calories,
    serving: val.serv_size,
    unit: val.serv_unit,
    fat: val.fat,
    carbs: val.carbs,
    protein: val.protein,
    sodium: val.sodium!,
    fibre: val.fibre!,
  });
  const [errors, setErrors] = useState<ErrorsType>({
    foodName: false,
    calories: false,
    serving: false,
    unit: false,
    fat: false,
    carbs: false,
    protein: false,
  });
  const [selectedImg, setSelectedImg] = useState<string | undefined>();
  const inputRefs = {
    calories: useRef<TI | null>(null),
    serving: useRef<TI | null>(null),
    unit: useRef<TI | null>(null),
    fat: useRef<TI | null>(null),
    carbs: useRef<TI | null>(null),
    protein: useRef<TI | null>(null),
    sodium: useRef<TI | null>(null),
    fibre: useRef<TI | null>(null),
  };

  const validateForm = () => {
    setErrors({
      foodName: false,
      calories: false,
      serving: false,
      unit: false,
      fat: false,
      carbs: false,
      protein: false,
    });
    if (!formData.fat || !formData.carbs || !formData.protein) {
      setErrors({
        ...errors,
        foodName: true,
        calories: true,
        serving: true,
        unit: true,
        fat: true,
        carbs: true,
        protein: true,
      });
      return false;
    }
    return true;
  };

  const handleUpdateFood = async () => {
    if (!validateForm()) {
      return;
    }

    const imagePath = await uploadImage(selectedImg! || val.food_img!);
    const {data} = supabase.storage
      .from('food-images')
      .getPublicUrl(`${imagePath}`);

    const updateVars = {
      protein: formData.protein,
      carbs: formData.carbs,
      fat: formData.fat,
      calories: formData.calories,
      fibre: formData.fibre || 0,
      sodium: formData.sodium || 0,
      serv_size: formData.serving,
      serv_unit: formData.unit,
      id: val.id,
      label: formData.foodName,
      food_img: data.publicUrl,
      user_id: session?.user.id!,
    };

    const items = {...updateVars, created_at: val.created_at};

    updateFood(updateVars, {
      onSuccess: () => navigation.navigate('SingleFoodScreen', {item: items}),
      onError: e => console.log('ERROR UPDATING =>>', e),
    });
  };

  const handleTextInput = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const handleNumberInput = (name: string, value: string) => {
    const parsedNumber = parseFloat(value); // Parse the string to a number
    if (!isNaN(parsedNumber)) {
      setFormData({...formData, [name]: parsedNumber});
    }
  };

  const handleNextInput = (key: keyof typeof inputRefs) => {
    inputRefs[key]?.current?.focus();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.imgCameraWrapper}>
          {selectedImg ? (
            <Image style={styles.cameraImg} source={{uri: selectedImg}} />
          ) : (
            <Image style={styles.cameraImg} source={{uri: val.food_img!}} />
          )}
          <View style={styles.cameraBtnWrapper}>
            <ButtonText
              children={'Gallery'}
              onPress={() => handleImagePicker(setSelectedImg)}
            />
            <ButtonText
              children={'Camera'}
              onPress={() => handleCamera(setSelectedImg)}
            />
          </View>
        </View>
        <TextInputLabel
          label={'Food Name'}
          enablesReturnKeyAutomatically={true}
          value={formData.foodName}
          unit={''}
          onChangeText={value => handleTextInput('foodName', value)}
          error={errors.foodName && !formData.foodName}
          onSubmitEditing={() => handleNextInput('calories')}
        />
        <TextInputLabel
          ref={inputRefs.calories}
          label={'Calories'}
          enablesReturnKeyAutomatically={true}
          value={formData.calories.toString()}
          unit={''}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('calories', value)}
          error={errors.calories && !formData.calories}
          onSubmitEditing={() => handleNextInput('serving')}
          autoCapitalize="none"
        />
        <TextInputLabel
          ref={inputRefs.serving}
          label={'Serving'}
          enablesReturnKeyAutomatically={true}
          value={formData.serving.toString()}
          unit={''}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('serving', value)}
          error={errors.serving && !formData.serving}
          onSubmitEditing={() => handleNextInput('unit')}
        />
        <TextInputLabel
          ref={inputRefs.unit}
          label={'Serving Unit'}
          enablesReturnKeyAutomatically={true}
          value={formData.unit}
          unit={''}
          onChangeText={value => handleTextInput('unit', value)}
          error={errors.unit && !formData.unit}
          onSubmitEditing={() => handleNextInput('fat')}
        />
        <TextInputLabel
          ref={inputRefs.fat}
          label={'Total Fat'}
          enablesReturnKeyAutomatically={true}
          value={formData.fat.toString()}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('fat', value)}
          error={errors.fat && !formData.fat}
          onSubmitEditing={() => handleNextInput('carbs')}
        />
        <TextInputLabel
          ref={inputRefs.carbs}
          label={'Total Carbs'}
          enablesReturnKeyAutomatically={true}
          value={formData.carbs.toString()}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('carbs', value)}
          error={errors.carbs && !formData.carbs}
          onSubmitEditing={() => handleNextInput('protein')}
        />
        <TextInputLabel
          ref={inputRefs.protein}
          label={'Protein'}
          enablesReturnKeyAutomatically={true}
          value={formData.protein.toString()}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('protein', value)}
          error={errors.protein && !formData.protein}
          onSubmitEditing={() => handleNextInput('sodium')}
        />
        <TextInputLabel
          ref={inputRefs.sodium}
          label={'Sodium'}
          enablesReturnKeyAutomatically={true}
          value={formData.sodium.toString()}
          keyboardType={'decimal-pad'}
          unit={'mg'}
          onChangeText={value => handleNumberInput('sodium', value)}
          onSubmitEditing={() => handleNextInput('fibre')}
        />
        <TextInputLabel
          ref={inputRefs.fibre}
          enablesReturnKeyAutomatically={true}
          label={'Fibre'}
          value={formData.fibre.toString()}
          keyboardType={'decimal-pad'}
          onChangeText={value => handleNumberInput('fibre', value)}
          onSubmitEditing={() => handleUpdateFood()}
        />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Submit'} onPress={() => handleUpdateFood()} />
      </View>
    </View>
  );
};

export default SingleFoodEdit;
