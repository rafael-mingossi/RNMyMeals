import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Login,
  Register,
  Initial,
  SingleFoodScreen,
  SingleFoodEdit,
  AddRecipe,
  Ingredients,
} from '@screens';
import {BottomNavigator, AddFoodNavigator} from '@config';
import {useAuth} from '@providers';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {SingleFoodType} from '@types';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {Icon} from 'react-native-paper';

export type StackNavigatorParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Initial: undefined;
  AddFoodRoot: undefined;
  SingleFood: undefined;
  SingleFoodScreen: {item: SingleFoodType};
  SingleFoodEdit: {item: SingleFoodType};
  AddRecipe: undefined;
  Ingredients: undefined;
};

export type InitialStack = NativeStackScreenProps<
  StackNavigatorParams,
  'Initial'
>;
export type LoginStack = NativeStackScreenProps<StackNavigatorParams, 'Login'>;
export type RegisterStack = NativeStackScreenProps<
  StackNavigatorParams,
  'Register'
>;

type SingleFoodRouteProp = RouteProp<StackNavigatorParams, 'SingleFoodScreen'>;
type SingleFoodNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  'SingleFoodScreen'
>;
export type SingleFoodPropsNavigation = {
  navigation: SingleFoodNavigationProp;
  route: SingleFoodRouteProp;
};

type SingleFoodEditRouteProp = RouteProp<
  StackNavigatorParams,
  'SingleFoodEdit'
>;
type SingleFoodEditNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  'SingleFoodEdit'
>;
export type SingleFoodEditPropsNavigation = {
  navigation: SingleFoodEditNavigationProp;
  route: SingleFoodEditRouteProp;
};

////NAVIGATION FOR NON-SCREENS
export type BottomSheetPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'AddFoodRoot'
>;

export type SingleFoodComponentPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'SingleFood'
>;

export type AddRecipeStack = NativeStackScreenProps<
  StackNavigatorParams,
  'AddRecipe'
>;

const Stack = createNativeStackNavigator<StackNavigatorParams>();

function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon size={hS(22)} source={'keyboard-backspace'} color={Colours.white} />
    </TouchableOpacity>
  );
}

const ScreenNavigator = () => {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  // if (!session) {
  //   return;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Initial'}
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
        {session ? (
          <>
            <Stack.Screen
              name="Home"
              component={BottomNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddFoodRoot"
              component={AddFoodNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingleFoodScreen"
              component={SingleFoodScreen}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: 'View Food',
              }}
            />
            <Stack.Screen
              name="SingleFoodEdit"
              component={SingleFoodEdit}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: 'Edit Food',
              }}
            />
            <Stack.Screen
              name="AddRecipe"
              component={AddRecipe}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: 'Add Recipe',
              }}
            />
            <Stack.Screen
              name="Ingredients"
              component={Ingredients}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: 'Ingredients',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Initial"
              component={Initial}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
