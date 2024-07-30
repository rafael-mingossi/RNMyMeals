import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';

////SCREENS
import {Dashboard, Profile, Foods, Recipes} from '@screens';
import {AddBottomSheet} from '../components';
import {hS, mS, vS} from '@utils';
import {Colours, Fonts} from '@constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SingleFoodType} from '@types';

export type BottomStackParams = {
  Dashboard: undefined;
  Recipes: undefined;
  Goals: undefined;
  Profile: undefined;
  Foods: undefined;
  AddScreenComponent: undefined;
  SingleFoodScreen: {item: SingleFoodType};
  RecipeDetails: {recipeId: number};
  AllMeals: undefined;
};

type FocusedProps = {
  color: string;
  focused: boolean;
  size: number;
};

type IconWrapperProps = {
  focused: FocusedProps;
  icon: string;
  label: string;
};

export type BottomScreenStack = NativeStackScreenProps<
  BottomStackParams,
  keyof BottomStackParams
>;

const Bottom = createBottomTabNavigator<BottomStackParams>();

const screenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: vS(75),
    backgroundColor: Colours.white,
  },
};

const AddScreenComponent = () => {
  return null;
};
const BottomIconWrapper = ({focused, icon, label}: IconWrapperProps) => {
  return (
    <View style={styles.iconWrapper}>
      <Icon
        size={hS(24)}
        source={icon}
        color={focused.focused ? Colours.green : Colours.gray}
      />
      <Text
        style={[
          styles.iconText,
          {
            color: focused.focused ? Colours.green : Colours.gray,
            fontFamily: focused.focused ? Fonts.bold : Fonts.regular,
          },
        ]}>
        {label}
      </Text>
    </View>
  );
};

///BOTTOM SCREEN OPTIONS
const bottomTabAddButtonOptions = {
  tabBarButton: () => <AddBottomSheet />,
};
const bottomTabHome = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper focused={focused} icon={'chart-line'} label={'HOME'} />
  ),
};
const bottomTabRecipes = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper
      focused={focused}
      icon={'book-open-page-variant-outline'}
      label={'RECIPES'}
    />
  ),
};
const bottomTabProfile = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper focused={focused} icon={'account'} label={'ME'} />
  ),
};
const bottomTabFoods = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper focused={focused} icon={'pasta'} label={'FOODS'} />
  ),
};

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={screenOptions}
      initialRouteName={'Dashboard'}
      backBehavior={'initialRoute'}>
      <Bottom.Screen
        name="Dashboard"
        component={Dashboard}
        options={bottomTabHome}
      />
      <Bottom.Screen name="Foods" component={Foods} options={bottomTabFoods} />
      <Bottom.Screen
        name="AddScreenComponent"
        component={AddScreenComponent}
        options={bottomTabAddButtonOptions}
      />
      <Bottom.Screen
        name="Recipes"
        component={Recipes}
        options={bottomTabRecipes}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={bottomTabProfile}
      />
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {alignItems: 'center', justifyContent: 'center'},
  iconText: {fontSize: mS(12)},
});

export default BottomNavigator;
