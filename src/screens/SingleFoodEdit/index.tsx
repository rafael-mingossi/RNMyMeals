import React, {FC, useRef, useState} from 'react';
import {Text, View, TextInput as TI, ScrollView, Image} from 'react-native';
import {SingleFoodEditPropsNavigation} from '@config';
import styles from './singleFoodEdit.styles.ts';
import {ButtonText, TextInputLabel} from '@components';
import {handleImagePicker, handleCamera} from '@utils';

type FormType = {
  foodName: string;
  calories: string;
  serving: string;
  unit: string;
  fat: string;
  carbs: string;
  protein: string;
  sodium: string;
  fibre: string;
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
  const [formData, setFormData] = useState<FormType>({
    foodName: val.label,
    calories: String(val.calories),
    serving: String(val.serv_size),
    unit: val.serv_unit,
    fat: String(val.fat),
    carbs: String(val.carbs),
    protein: String(val.protein),
    sodium: String(val.sodium),
    fibre: String(val.fibre),
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

  const handleInputChange = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
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
        onChangeText={val => handleInputChange('foodName', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Calories'}
        enablesReturnKeyAutomatically={true}
        value={formData.calories}
        unit={''}
        onChangeText={val => handleInputChange('calories', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Serving'}
        enablesReturnKeyAutomatically={true}
        value={formData.serving}
        unit={''}
        onChangeText={val => handleInputChange('serving', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Serving Unit'}
        enablesReturnKeyAutomatically={true}
        value={formData.unit}
        unit={''}
        onChangeText={val => handleInputChange('unit', val)}
        // error={errors.fat && formData.fat === ''}
        // onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        label={'Total Fat'}
        enablesReturnKeyAutomatically={true}
        value={formData.fat}
        onChangeText={val => handleInputChange('fat', val)}
        error={errors.fat && formData.fat === ''}
        onSubmitEditing={() => handleNextInput('carbs')}
      />
      <TextInputLabel
        ref={inputRefs.carbs}
        label={'Total Carbs'}
        enablesReturnKeyAutomatically={true}
        value={formData.carbs}
        onChangeText={val => handleInputChange('carbs', val)}
        error={errors.carbs && formData.carbs === ''}
        onSubmitEditing={() => handleNextInput('protein')}
      />
      <TextInputLabel
        ref={inputRefs.protein}
        label={'Protein'}
        enablesReturnKeyAutomatically={true}
        value={formData.protein}
        onChangeText={val => handleInputChange('protein', val)}
        error={errors.protein && formData.protein === ''}
        onSubmitEditing={() => handleNextInput('sodium')}
      />
      <TextInputLabel
        ref={inputRefs.sodium}
        label={'Sodium'}
        enablesReturnKeyAutomatically={true}
        value={formData.sodium}
        unit={'mg'}
        onChangeText={val => handleInputChange('sodium', val)}
        onSubmitEditing={() => handleNextInput('fibre')}
      />
      <TextInputLabel
        ref={inputRefs.fibre}
        enablesReturnKeyAutomatically={true}
        label={'Fibre'}
        value={formData.fibre}
        onChangeText={val => handleInputChange('fibre', val)}
        onSubmitEditing={() => handleSubmitForm()}
      />
    </ScrollView>
  );
};

export default SingleFoodEdit;
