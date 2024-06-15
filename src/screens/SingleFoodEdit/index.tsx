import React, {FC, useRef, useState} from 'react';
import {Text, View, TextInput as TI, ScrollView, Image} from 'react-native';
import {SingleFoodEditPropsNavigation} from '@config';
import styles from './singleFoodEdit.styles.ts';
import {ButtonText, TextInputLabel} from '@components';
import {handleImagePicker, handleCamera} from '@utils';
import {useUpdateFood} from '@api';
import {useAuth} from '@providers';

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
  fat: boolean;
  carbs: boolean;
  protein: boolean;
};

const temp_img =
  'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/camera_placeholder.png';

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
    sodium: val.sodium,
    fibre: val.fibre,
  });
  const [errors, setErrors] = useState<ErrorsType>({
    fat: false,
    carbs: false,
    protein: false,
  });
  const [selectedImg, setSelectedImg] = useState<string | undefined>();
  const inputRefs = {
    calories: useRef<TI | null>(null),
    serving: useRef<TI | null>(null),
    unit: useRef<TI | null>(null),
    carbs: useRef<TI | null>(null),
    protein: useRef<TI | null>(null),
    sodium: useRef<TI | null>(null),
    fibre: useRef<TI | null>(null),
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

  const handleUpdateFood = () => {
    const updateVars = {
      protein: formData.protein,
      carbs: formData.carbs,
      fat: formData.fat,
      calories: formData.calories,
      fibre: formData.fibre,
      sodium: formData.sodium,
      serv_size: formData.serving,
      serv_unit: formData.unit,
      id: val.id,
      label: formData.foodName,
      food_img: selectedImg || val.food_img,
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

  const handleSubmitForm = () => {
    if (!validateForm()) {
      return;
    }
  };

  return (
    <ScrollView style={styles.scrollWrapper}>
      <View style={styles.imgCameraWrapper}>
        {selectedImg ? (
          <Image style={styles.cameraImg} source={{uri: selectedImg}} />
        ) : (
          <Image style={styles.cameraImg} source={{uri: val.food_img}} />
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
        onChangeText={val => handleTextInput('foodName', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Calories'}
        enablesReturnKeyAutomatically={true}
        value={formData.calories.toString()}
        unit={''}
        onChangeText={val => handleNumberInput('calories', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Serving'}
        enablesReturnKeyAutomatically={true}
        value={formData.serving.toString()}
        unit={''}
        onChangeText={val => handleNumberInput('serving', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Serving Unit'}
        enablesReturnKeyAutomatically={true}
        value={formData.unit}
        unit={''}
        onChangeText={val => handleTextInput('unit', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Total Fat'}
        enablesReturnKeyAutomatically={true}
        value={formData.fat.toString()}
        onChangeText={val => handleNumberInput('fat', val)}
        error={errors.fat && !formData.fat}
        onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        ref={inputRefs.carbs}
        label={'Total Carbs'}
        enablesReturnKeyAutomatically={true}
        value={formData.carbs.toString()}
        onChangeText={val => handleNumberInput('carbs', val)}
        error={errors.carbs && !formData.carbs}
        onSubmitEditing={() => handleNextInput('protein')}
      />
      <TextInputLabel
        ref={inputRefs.protein}
        label={'Protein'}
        enablesReturnKeyAutomatically={true}
        value={formData.protein.toString()}
        onChangeText={val => handleNumberInput('protein', val)}
        error={errors.protein && !formData.protein}
        onSubmitEditing={() => handleNextInput('sodium')}
      />
      <TextInputLabel
        ref={inputRefs.sodium}
        label={'Sodium'}
        enablesReturnKeyAutomatically={true}
        value={formData.sodium.toString()}
        unit={'mg'}
        onChangeText={val => handleNumberInput('sodium', val)}
        onSubmitEditing={() => handleNextInput('fibre')}
      />
      <TextInputLabel
        ref={inputRefs.fibre}
        enablesReturnKeyAutomatically={true}
        label={'Fibre'}
        value={formData.fibre.toString()}
        onChangeText={val => handleNumberInput('fibre', val)}
        onSubmitEditing={() => handleSubmitForm()}
      />
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Submit'} onPress={() => handleUpdateFood()} />
      </View>
    </ScrollView>
  );
};

export default SingleFoodEdit;
