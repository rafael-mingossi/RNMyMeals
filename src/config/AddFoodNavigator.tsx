import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AddFood, AddNutrients} from '@screens';
import {TouchableOpacity} from 'react-native';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-paper';

export type AddFoodStackNavigatorParams = {
  AddFood: undefined;
  AddNutrients: undefined;
};

export type AddFoodStack = NativeStackScreenProps<
  AddFoodStackNavigatorParams,
  'AddFood'
>;
export type AddNutrientsStack = NativeStackScreenProps<
  AddFoodStackNavigatorParams,
  'AddNutrients'
>;

const Stack = createNativeStackNavigator<AddFoodStackNavigatorParams>();

function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon size={hS(22)} source={'keyboard-backspace'} color={Colours.white} />
    </TouchableOpacity>
  );
}

const AddFoodNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AddFood'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerLeft: () => HeaderLeft(),
        headerStyle: {
          backgroundColor: Colours.green,
        },
        headerTintColor: Colours.white,
        headerTitleStyle: {
          fontFamily: Fonts.semiBold,
          fontSize: hS(18),
        },
      }}>
      <Stack.Screen
        name={'AddFood'}
        component={AddFood}
        options={{headerTitle: 'New Food'}}
      />
      <Stack.Screen
        name={'AddNutrients'}
        component={AddNutrients}
        options={{headerTitle: 'Food Nutrients'}}
      />
    </Stack.Navigator>
  );
};

export default AddFoodNavigator;
