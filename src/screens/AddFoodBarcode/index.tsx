import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useAddFood, useProductInfo} from '@api';
import {ButtonText, Loader} from '@components';
import styles from './addFoodBarcode.styles.ts';
import {BottomScreenStack} from '../../config/BottomNavigator.tsx';
import {useAuth} from '@providers';
import {uploadImage} from '@utils';
import {supabase} from '@services';

const AddFoodBarcode = ({navigation}: BottomScreenStack) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const {mutate: addFood} = useAddFood();
  const {session} = useAuth();
  const [showCamera, setShowCamera] = useState(true);
  const [scannedItem, setScannedItem] = useState<string | undefined>('');
  const temp_img =
    'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/camera_placeholder.png';

  const {
    data: productInfo,
    isLoading,
    error,
  } = useProductInfo(scannedItem ? scannedItem : null);

  console.log('productInfo =>>>', productInfo);
  console.log('error =>>>', error);

  useEffect(() => {
    requestPermission().then(() => {});
  }, []);

  console.log(scannedItem);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0].value) {
        setScannedItem(codes[0].value);
        setShowCamera(false);
      }
    },
  });

  const handleSubmitForm = async () => {
    const addFoodVars = {
      protein: productInfo?.protein,
      carbs: productInfo?.carbohydrates,
      fat: productInfo?.fat,
      calories: productInfo?.calories,
      fibre: productInfo?.fibre || 0,
      sodium: productInfo?.sodium || 0,
      serv_size: 100,
      serv_unit: 'grams',
      label: productInfo?.name,
      food_img: productInfo?.image || temp_img,
      user_id: session?.user.id,
    };

    if (productInfo) {
      addFood(addFoodVars, {
        onSuccess: () => {
          // TODO: ADD TOAST MAYBE
          navigation.navigate('Foods');
        },
        onError: e => {
          console.log('Error addFood API =>>', e);
        },
      });
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>NO CAMERA DEVICE</Text>
      </View>
    );
  }

  return !hasPermission ? (
    <View>
      <Text>NO PERMISSIONS</Text>
    </View>
  ) : showCamera ? (
    <Camera
      codeScanner={codeScanner}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  ) : isLoading ? (
    <Loader />
  ) : productInfo ? (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.imgCameraWrapper}>
          <Image style={styles.cameraImg} source={{uri: productInfo?.image}} />
          <Text style={styles.prodName}>{productInfo?.name}</Text>
        </View>
        <View style={styles.horizontalSpacing}>
          <Text style={styles.regularTxt}>Serving size</Text>
          <Text style={[styles.regularTxt, styles.blue]}>
            1 serving (100 grams)
          </Text>
        </View>
        <View style={styles.thickerLine} />
        <View style={styles.horizontalSpacing}>
          <Text style={styles.caloriesTxt}>Calories</Text>
          <Text style={styles.caloriesValue}>{productInfo?.calories}</Text>
        </View>
        <View style={styles.thickerLine} />
        <View style={styles.nutrientsWrapper}>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Protein</Text>
            <Text style={styles.valsTxt}>{productInfo?.protein} g</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Carbs</Text>
            <Text style={styles.valsTxt}>{productInfo?.carbohydrates} g</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Fat</Text>
            <Text style={styles.valsTxt}>{productInfo?.fat} g</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Sodium</Text>
            <Text style={styles.valsTxt}>{productInfo?.sodium} g</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Fiber</Text>
            <Text style={styles.valsTxt}>{productInfo?.fibre} g</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText
          children={'Return'}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ButtonText children={'Update'} onPress={() => {}} />
        <ButtonText children={'Submit'} onPress={() => handleSubmitForm()} />
      </View>
    </View>
  ) : (
    <View>
      <Text>No product information found</Text>
    </View>
  );
};

export default AddFoodBarcode;
