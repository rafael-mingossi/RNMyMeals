import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput as TI,
  Platform,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colours} from '@constants';
import {ButtonText, CustomModal} from '@components';
import {AddFoodStack} from '@config';
import styles from './addFood.styles.ts';
import {handleCamera, handleImagePicker} from '@utils';

type ErrorsType = {
  name: boolean;
  calories: boolean;
  serving: boolean;
  unit: boolean;
};

type FormType = {
  foodName: string | null;
  calories: number | null;
  serving: number | null;
  unit: string | null;
};

const AddFood: FC<AddFoodStack> = ({navigation}) => {
  const [formData, setFormData] = useState<FormType>({
    foodName: null,
    calories: null,
    serving: null,
    unit: null,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalErrorMsg, setModalErrorMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsType>({
    name: false,
    calories: false,
    serving: false,
    unit: false,
  });
  const [selectedImg, setSelectedImg] = useState<string | undefined>();

  const caloriesRef = useRef<TI | null>(null);
  const servingRef = useRef<TI | null>(null);
  const unitRef = useRef<TI | null>(null);

  const handleTextInput = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const handleNumberInput = (name: string, value: string) => {
    const parsedNumber = parseFloat(value); // Parse the string to a number
    if (!isNaN(parsedNumber)) {
      setFormData({...formData, [name]: parsedNumber});
    }
  };

  //VALIDATE FORM DATA AND ADD ERROR MESSAGES
  const validateForm = () => {
    if (!formData.foodName) {
      setErrors({...errors, name: true});
      setIsModalOpen(true);
      setModalErrorMsg('Food name cannot be empty!');
      return false;
    }

    if (!formData.calories) {
      setErrors({...errors, calories: true});
      setIsModalOpen(true);
      setModalErrorMsg('Calories cannot be empty!');
      return false;
    }

    if (!formData.serving) {
      setErrors({...errors, serving: true});
      setIsModalOpen(true);
      setModalErrorMsg('Serving size cannot be empty!');
      return false;
    }

    if (!formData.unit) {
      setErrors({...errors, unit: true});
      setIsModalOpen(true);
      setModalErrorMsg('Serving unit cannot be empty!');
      return false;
    }

    navigation.navigate('AddNutrients', {
      foodName: formData.foodName,
      calories: formData.calories,
      serving: formData.serving,
      unit: formData.unit,
      img: selectedImg || '',
    });
    return true;
  };

  //VALIDATE CALORIES AND SERVING TO BE NUMBER ONLY
  // const handleCaloriesInput = (inputText: string) => {
  //   const numericText = inputText.replace(/[^0-9]/g, '');
  //   handleTextInput('calories', numericText);
  // };
  //
  // const handleServingInput = (inputText: string) => {
  //   const numericText = inputText.replace(/[^0-9]/g, '');
  //   handleTextInput('serving', numericText);
  // };

  //HANDLE NEXT BUTTON
  const handleNextScreen = () => {
    if (validateForm()) {
      navigation.navigate('AddNutrients', {
        foodName: formData.foodName,
        calories: formData.calories,
        serving: formData.serving,
        unit: formData.unit,
        img: selectedImg || '',
      });
    }
  };

  //CLEAR INPUTS AFTER USER TAPS
  useEffect(() => {
    if (errors.name || errors.calories || errors.serving) {
      setModalErrorMsg('');
      setIsModalOpen(false);
      setErrors({name: false, calories: false, serving: false, unit: false});
    }
  }, [formData]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <ScrollView style={styles.scrollWrapper}>
        <Text style={styles.imgLabel}>
          You can select an image for your food:
        </Text>
        <View style={styles.imgCameraWrapper}>
          {selectedImg ? (
            <Image style={styles.cameraImg} source={{uri: selectedImg}} />
          ) : (
            <Image
              style={styles.cameraImg}
              source={require('../../assets/images/camera_placeholder.png')}
            />
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
        <View>
          <TextInput
            label="Food Name"
            value={formData.foodName!}
            enterKeyHint={'next'}
            returnKeyType={'done'}
            onChangeText={val => handleTextInput('foodName', val)}
            right={
              errors.name ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => {
              if (!formData.foodName) {
                setErrors({...errors, name: true});
                setIsModalOpen(true);
                setModalErrorMsg('Food name cannot be empty!');
                return false;
              }
              setIsModalOpen(false);
              caloriesRef.current?.focus();
            }}
          />
          <Text style={styles.subLabel}>
            Choose a name for the food that you want to log
          </Text>
        </View>

        <View>
          <TextInput
            ref={caloriesRef}
            label="Food Calories, (Cal)"
            value={formData.calories?.toString()}
            enterKeyHint={Platform.OS === 'ios' ? 'done' : 'next'}
            returnKeyType={'done'}
            keyboardType={'decimal-pad'}
            onChangeText={val => handleNumberInput('calories', val)}
            right={
              errors.calories ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => {
              if (!formData.calories) {
                setErrors({...errors, calories: true});
                setIsModalOpen(true);
                setModalErrorMsg('Calories cannot be empty!');
                return false;
              }
              setIsModalOpen(false);
              servingRef.current?.focus();
            }}
          />
          <Text style={styles.subLabel}>
            Enter the value correspondent in Calories
          </Text>
        </View>

        <View>
          <TextInput
            ref={servingRef}
            label="Serving Size, (grams, slice, spoon, etc...)"
            value={formData.serving?.toString()}
            keyboardType={'decimal-pad'}
            enterKeyHint={Platform.OS === 'ios' ? 'done' : 'next'}
            returnKeyType={'done'}
            onChangeText={val => handleNumberInput('serving', val)}
            right={
              errors.serving ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => {
              if (!formData.serving) {
                setErrors({...errors, serving: true});
                setIsModalOpen(true);
                setModalErrorMsg('Serving size cannot be empty!');
                return false;
              }
              setIsModalOpen(false);
              unitRef.current?.focus();
            }}
          />
          <Text style={styles.subLabel}>
            Serving size in grams to be used in the calculation
          </Text>
        </View>
        <View>
          <TextInput
            ref={unitRef}
            label="Serving unit, (grams, slice, spoon, etc...)"
            value={formData.unit!}
            returnKeyType={'done'}
            onChangeText={val => handleTextInput('unit', val)}
            right={
              errors.unit ? (
                <TextInput.Icon icon={'alert-circle'} color={Colours.darkRed} />
              ) : null
            }
            onSubmitEditing={() => {
              if (!formData.unit) {
                setErrors({...errors, unit: true});
                setIsModalOpen(true);
                setModalErrorMsg('Serving unit cannot be empty!');
                return false;
              }
              setIsModalOpen(false);
              navigation.navigate('AddNutrients', {
                foodName: formData.foodName,
                calories: formData.calories,
                serving: formData.serving,
                unit: formData.unit,
                img: selectedImg || '',
              });
            }}
          />
          <Text style={styles.subLabel}>
            Units such as grams, slice, spoon, sachet, bag, etc...
          </Text>
        </View>

        <CustomModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          children={
            <>
              <Text style={styles.modalText}>{modalErrorMsg}</Text>
              <ButtonText
                children={'OK'}
                style={styles.closeModalBtn}
                onPress={() => setIsModalOpen(false)}
              />
            </>
          }
        />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Cancel'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Next'} onPress={() => handleNextScreen()} />
      </View>
    </View>
  );
};

export default AddFood;
