import React, {FC, useRef, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput as TI,
  View,
} from 'react-native';
import {Colours} from '@constants';
import {ButtonText, TextInputLabel} from '@components';
import {AddNutrientsStack} from '@config';
import {useAddFood} from '@api';
import styles from './addNutrients.styles.ts';
import {useAuth} from '@providers';
import {uploadImage} from '@utils';

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

  const inputRefs = {
    carbs: useRef<TI | null>(null),
    protein: useRef<TI | null>(null),
    sodium: useRef<TI | null>(null),
    fibre: useRef<TI | null>(null),
  };

  const handleNextInput = (key: keyof typeof inputRefs) => {
    inputRefs[key]?.current?.focus();
  };

  const temp_img =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

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

  const handleSubmitForm = async () => {
    if (!validateForm()) {
      return;
    }

    const imagePath = await uploadImage(img);

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
        food_img: imagePath ? imagePath : temp_img,
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

  useEffect(() => {
    setErrors({...errors, fat: false, carbs: false, protein: false});
  }, [formData]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.topWrapper}>
        <Image
          source={img ? {uri: img} : {uri: temp_img}}
          style={styles.foodImg}
        />
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
          autoFocus={true}
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
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Submit'} onPress={() => handleSubmitForm()} />
      </View>
    </View>
  );
};

export default AddNutrients;
