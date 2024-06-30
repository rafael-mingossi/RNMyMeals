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
  IngredientView,
  RecipeDetails,
} from '@screens';
import {BottomNavigator, AddFoodNavigator} from '@config';
import {useAuth} from '@providers';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
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
  IngredientView: {item: SingleFoodType};
  Recipes: undefined;
  RecipeDetails: {recipeId: number};
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

export type RecipesStack = NativeStackScreenProps<
  StackNavigatorParams,
  'Recipes'
>;

export type IngredientsStack = NativeStackScreenProps<
  StackNavigatorParams,
  'Ingredients'
>;

type RecipesDetailsRouteProp = RouteProp<StackNavigatorParams, 'RecipeDetails'>;
type RecipesDetailsNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  'RecipeDetails'
>;
export type RecipeDetailsPropsNavigation = {
  navigation: RecipesDetailsNavigationProp;
  route: RecipesDetailsRouteProp;
};

type IngredientsViewRouteProp = RouteProp<
  StackNavigatorParams,
  'IngredientView'
>;
type IngredientsViewNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  'IngredientView'
>;
export type IngredientsViewPropsNavigation = {
  navigation: IngredientsViewNavigationProp;
  route: IngredientsViewRouteProp;
};

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

function HeaderLeftRounded() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.leftRounded}>
      <Icon size={hS(22)} source={'keyboard-backspace'} color={Colours.green} />
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
            <Stack.Screen
              name="IngredientView"
              component={IngredientView}
              options={{
                headerShown: false,
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: 'Ingredient',
                headerBackVisible: false,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              options={{
                headerShown: true,
                headerLeft: () => HeaderLeftRounded(),
                headerTitleAlign: 'center',
                headerTintColor: Colours.white,
                title: '',
                headerBackVisible: false,
                headerTransparent: true,
                headerStyle: {
                  backgroundColor: 'transparent',
                },
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

const styles = StyleSheet.create({
  leftRounded: {
    backgroundColor: Colours.white,
    borderRadius: 300,
    padding: 5,
  },
});

export default ScreenNavigator;
