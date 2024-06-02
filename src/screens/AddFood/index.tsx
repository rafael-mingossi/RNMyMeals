import React, {FC, useEffect, useRef, useState} from 'react';
import {ScrollView, StatusBar, Text, View, TextInput as TI} from 'react-native';
import {Colours} from '@constants';
import {TextInput} from 'react-native-paper';
import styles from './addFood.styles.ts';
import {ButtonText, CustomModal} from '@components';
import {AddFoodStack} from '@config';

type ErrorsType = {
  name: boolean;
  calories: boolean;
  serving: boolean;
};

const AddFood: FC<AddFoodStack> = ({navigation}) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [serving, setServing] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    name: false,
    calories: false,
    serving: false,
  });

  const caloriesRef = useRef<TI | null>(null);
  const servingRef = useRef<TI | null>(null);

  const handleNext = () => {
    if (!foodName) {
      setErrors({...errors, name: true});
      setIsModalOpen(true);
    } else if (!calories) {
      setErrors({...errors, calories: true});
      setIsModalOpen(true);
    } else if (!serving) {
      setErrors({...errors, serving: true});
      setIsModalOpen(true);
    } else {
      navigation.navigate('AddNutrients', {
        foodName,
        calories,
        serving,
      });
    }
  };

  const handleCaloriesInput = (inputText: string) => {
    const numericText = inputText.replace(/[^0-9]/g, '');
    setCalories(numericText);
  };

  const handleServingInput = (inputText: string) => {
    const numericText = inputText.replace(/[^0-9]/g, '');
    setServing(numericText);
  };

  useEffect(() => {
    if (errors.name || errors.calories || errors.serving) {
      setErrors({...errors, name: false, calories: false, serving: false});
    }
  }, [foodName, calories, serving]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        <StatusBar backgroundColor={Colours.green} />
        <View>
          <TextInput
            label="Food Name"
            value={foodName}
            error={isModalOpen}
            onChangeText={val => setFoodName(val)}
            right={
              errors.name ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => caloriesRef.current?.focus()}
          />
          <Text style={styles.subLabel}>
            Choose a name for the food that you want to log
          </Text>
        </View>

        <View>
          <TextInput
            ref={caloriesRef}
            label="Food Calories, (Cal)"
            value={calories}
            keyboardType={'numeric'}
            onChangeText={val => handleCaloriesInput(val)}
            right={
              errors.calories ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => servingRef.current?.focus()}
          />
          <Text style={styles.subLabel}>
            Enter the value correspondent in Calories
          </Text>
        </View>

        <View>
          <TextInput
            ref={servingRef}
            label="Serving Size, (grams)"
            value={serving}
            keyboardType={'numeric'}
            onChangeText={val => handleServingInput(val)}
            right={
              errors.serving ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => handleNext()}
          />
          <Text style={styles.subLabel}>
            Serving size in grams to be used in the calculation
          </Text>
        </View>
        {isModalOpen && (
          <CustomModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            children={
              <>
                <Text style={styles.modalText}>Value cannot be empty!</Text>
                <ButtonText
                  children={'OK'}
                  style={styles.closeModalBtn}
                  onPress={() => setIsModalOpen(false)}
                />
              </>
            }
          />
        )}
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Cancel'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Next'} onPress={() => handleNext()} />
      </View>
    </View>
  );
};

export default AddFood;
