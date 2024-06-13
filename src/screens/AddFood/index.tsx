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
import {
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
  Asset,
  ErrorCode,
} from 'react-native-image-picker';
import {Colours} from '@constants';
import {ButtonText, CustomModal} from '@components';
import {AddFoodStack} from '@config';
import styles from './addFood.styles.ts';

type ErrorsType = {
  name: boolean;
  calories: boolean;
  serving: boolean;
  unit: boolean;
};

type FormType = {
  foodName: string;
  calories: string;
  serving: string;
  unit: string;
};

interface ImagePickerOptions {
  title?: string;
  storageOptions: {
    skipBackup: boolean;
    path?: string; // Optional: Custom path for camera photos on Android (external storage permission required)
  };
  allowsEditing: boolean;
  quality: PhotoQuality;
  mediaType: 'photo';
  aspect: [number, number];
}

type CameraTypes = {
  didCancel?: boolean;
  error?: ErrorCode;
  errorMessage?: string;
  assets?: Asset[];
  uri?: string;
};

const temp_img =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const AddFood: FC<AddFoodStack> = ({navigation}) => {
  const [formData, setFormData] = useState<FormType>({
    foodName: '',
    calories: '',
    serving: '',
    unit: '',
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

  const handleCamera = () => {
    let options: ImagePickerOptions = {
      storageOptions: {
        skipBackup: true, // Prevent photos from being backed up to iCloud/Google Photos
        path: 'image', // Optional: Custom path for camera photos on Android (external storage permission required)
      },
      mediaType: 'photo' as const,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    launchCamera(options).then((response: CameraTypes) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.error('ImagePicker Error:', response.error);
      } else {
        response?.assets ? setSelectedImg(response?.assets[0]?.uri) : null;
      }
    });
  };

  const handleImagePicker = () => {
    let options: ImagePickerOptions = {
      storageOptions: {
        skipBackup: true, // Prevent photos from being backed up to iCloud/Google Photos
        path: 'image', // Optional: Custom path for camera photos on Android (external storage permission required)
      },
      mediaType: 'photo' as const,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    launchImageLibrary(options).then((response: CameraTypes) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.error('ImagePicker Error:', response.error);
      } else {
        response?.assets ? setSelectedImg(response?.assets[0]?.uri) : null;
      }
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
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
  const handleCaloriesInput = (inputText: string) => {
    const numericText = inputText.replace(/[^0-9]/g, '');
    handleInputChange('calories', numericText);
  };

  const handleServingInput = (inputText: string) => {
    const numericText = inputText.replace(/[^0-9]/g, '');
    handleInputChange('serving', numericText);
  };

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
            <Image
              style={styles.cameraImg}
              source={{uri: selectedImg || temp_img}}
            />
          ) : (
            <Image
              style={styles.cameraImg}
              source={require('../../assets/images/camera_placeholder.png')}
            />
          )}
          <View style={styles.cameraBtnWrapper}>
            <ButtonText
              children={'Gallery'}
              onPress={() => handleImagePicker()}
            />
            <ButtonText children={'Camera'} onPress={() => handleCamera()} />
          </View>
        </View>
        <View>
          <TextInput
            label="Food Name"
            value={formData.foodName}
            enterKeyHint={'next'}
            returnKeyType={'done'}
            onChangeText={val => handleInputChange('foodName', val)}
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
            value={formData.calories}
            enterKeyHint={Platform.OS === 'ios' ? 'done' : 'next'}
            returnKeyType={'done'}
            keyboardType={'numeric'}
            onChangeText={val => handleCaloriesInput(val)}
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
            label="Serving Size, (grams)"
            value={formData.serving}
            keyboardType={'numeric'}
            enterKeyHint={Platform.OS === 'ios' ? 'done' : 'next'}
            returnKeyType={'done'}
            onChangeText={val => handleServingInput(val)}
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
            value={formData.unit}
            returnKeyType={'done'}
            onChangeText={val => handleInputChange('unit', val)}
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
