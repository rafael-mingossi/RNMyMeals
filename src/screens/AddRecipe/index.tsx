import React, {useRef, useState} from 'react';
import {ScrollView, Text, View, TextInput as TI} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colours} from '@constants';
import styles from './addRecipe.styles.ts';
import {ButtonText, TextInputLabel} from '@components';
import {AddRecipeStack} from '@config';

type ErrorsType = {
  name: boolean;
  serving: boolean;
  unit: boolean;
};

type FormType = {
  name: string | null;
  serving: number | null;
  unit: string | null;
};

const AddRecipe = ({navigation}: AddRecipeStack) => {
  const servingRef = useRef<TI | null>(null);
  const unitRef = useRef<TI | null>(null);

  const [formData, setFormData] = useState<FormType>({
    name: null,
    serving: null,
    unit: null,
  });

  const [errors, setErrors] = useState<ErrorsType>({
    name: false,
    serving: false,
    unit: false,
  });

  const handleTextInput = (name: string, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const handleNumberInput = (name: string, value: string) => {
    const parsedNumber = parseFloat(value); // Parse the string to a number
    if (!isNaN(parsedNumber)) {
      setFormData({...formData, [name]: parsedNumber});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={styles.blockPadding}>
          <View>
            <TextInput
              label="Recipe Name"
              value={formData.name!}
              enterKeyHint={'next'}
              returnKeyType={'done'}
              onChangeText={val => handleTextInput('name', val)}
              right={
                errors.name ? (
                  <TextInput.Icon
                    icon={'alert-circle'}
                    color={Colours.darkRed}
                  />
                ) : null
              }
              onSubmitEditing={() => {
                if (!formData.name) {
                  setErrors({...errors, name: true});
                  return false;
                }
                servingRef.current?.focus();
              }}
            />
            <Text style={styles.subLabel}>
              Choose a name for the Recipe that you want to create
            </Text>
          </View>
          <View style={styles.inputs}>
            <TextInputLabel
              ref={servingRef}
              label={'Serving Size'}
              enablesReturnKeyAutomatically={true}
              value={formData.serving?.toString()}
              unit={''}
              keyboardType={'decimal-pad'}
              onChangeText={val => handleNumberInput('serving', val)}
              error={errors.serving && !formData.serving}
              onSubmitEditing={() => {}}
            />
          </View>
          <View style={styles.inputs}>
            <TextInputLabel
              ref={unitRef}
              label={'Serving Unit'}
              enablesReturnKeyAutomatically={true}
              value={formData.unit!}
              unit={''}
              keyboardType={'decimal-pad'}
              onChangeText={val => handleTextInput('unit', val)}
              error={errors.unit && !formData.unit}
              onSubmitEditing={() => {}}
            />
          </View>
          <Text style={[styles.subLabel, styles.extraMargin]}>
            Serving size and unit can be the same as the ones mentioned on the
            package of the food you added previously. I.E. '1 spoon' or '100
            grams'.
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.blockPadding}>
          <Text style={styles.label}>0 Ingredients</Text>
          <Text style={styles.label}>List goes here</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.blockPadding}>
          <Text style={[styles.label, styles.extraPadding]}>Nutrients:</Text>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>
              Total Calories (in calories):
            </Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Protein (in grams):</Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Carbs (in grams):</Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Fat (in grams):</Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Fibre (in grams):</Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>Total Carbs (in grams):</Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
          <View style={styles.singleTotal}>
            <Text style={styles.totalsTxtBold}>
              Total Sodium (in milligrams):
            </Text>
            <Text style={styles.valsTxt}>0</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <ButtonText
          children={'Cancel'}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ButtonText
          children={'Ingredients'}
          onPress={() => navigation.navigate('Ingredients')}
        />
        <ButtonText children={'Save'} onPress={() => {}} />
      </View>
    </View>
  );
};

export default AddRecipe;
