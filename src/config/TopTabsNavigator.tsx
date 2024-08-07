import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AddRecipeToLists, AddFoodToLists} from '@screens';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Colours, Fonts} from '@constants';
import {mS} from '@utils';
import {SingleFoodType} from '@types';
import {RouteProp} from '@react-navigation/native';

export type StackTopNavigatorParams = {
  AddFoodToLists: undefined;
  AddRecipeToLists: undefined;
  IngredientView: {item: SingleFoodType; isFood?: boolean};
};

export type ScreenTopStack = NativeStackScreenProps<
  StackTopNavigatorParams,
  keyof StackTopNavigatorParams
>;

export type NavigationScreenTopProp = NativeStackNavigationProp<
  StackTopNavigatorParams,
  keyof StackTopNavigatorParams
>;

type IngredientsViewRouteProp = RouteProp<
  StackTopNavigatorParams,
  'IngredientView'
>;

export type IngredientsViewPropsTopNavigation = {
  navigation: NavigationScreenTopProp;
  route: IngredientsViewRouteProp;
};

const Tab = createMaterialTopTabNavigator<StackTopNavigatorParams>();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colours.green,
        tabBarLabelStyle: {fontSize: mS(12), fontFamily: Fonts.regular},
      }}>
      <Tab.Screen
        name="AddFoodToLists"
        component={AddFoodToLists}
        options={{title: 'Foods'}}
      />
      <Tab.Screen
        name="AddRecipeToLists"
        component={AddRecipeToLists}
        options={{title: 'Recipes'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabsNavigator;
