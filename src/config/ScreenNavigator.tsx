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
  AddListItems,
  AllMeals,
  SingleMealLunch,
} from '@screens';
import {BottomNavigator, AddFoodNavigator} from '@config';
import {useAuth, FilteredItemsProvider} from '@providers';
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
  AddListItems: {listItem: 'breakie' | 'snack' | 'lunch' | 'dinner'};
  AllMeals: undefined;
  SingleMealLunch: undefined;
};

//Navigation to screens only, using Navigation prop
export type ScreenStack = NativeStackScreenProps<
  StackNavigatorParams,
  keyof StackNavigatorParams
>;

//Navigation to screens and non-screens, using Navigation prop with goBack()
export type NavigationScreenProp = NativeStackNavigationProp<
  StackNavigatorParams,
  keyof StackNavigatorParams
>;

type ListItemsRouteProp = RouteProp<StackNavigatorParams, 'AddListItems'>;
export type ListItemsPropsNavigation = {
  navigation: NavigationScreenProp;
  route: ListItemsRouteProp;
};

type RecipesDetailsRouteProp = RouteProp<StackNavigatorParams, 'RecipeDetails'>;
export type RecipeDetailsPropsNavigation = {
  navigation: NavigationScreenProp;
  route: RecipesDetailsRouteProp;
};

// type IngredientsViewRouteProp = RouteProp<
//   StackNavigatorParams,
//   'IngredientView'
// >;
// export type IngredientsViewPropsNavigation = {
//   navigation: NavigationScreenProp;
//   route: IngredientsViewRouteProp;
// };

type SingleFoodRouteProp = RouteProp<StackNavigatorParams, 'SingleFoodScreen'>;
export type SingleFoodPropsNavigation = {
  navigation: NavigationScreenProp;
  route: SingleFoodRouteProp;
};

type SingleFoodEditRouteProp = RouteProp<
  StackNavigatorParams,
  'SingleFoodEdit'
>;
export type SingleFoodEditPropsNavigation = {
  navigation: NavigationScreenProp;
  route: SingleFoodEditRouteProp;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

function HeaderLeft() {
  const navigation: NavigationScreenProp = useNavigation();
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
      <FilteredItemsProvider>
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
                  headerLeft: () => HeaderLeftRounded(),
                  headerShown: true,
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
              <Stack.Screen
                name="AddListItems"
                component={AddListItems}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AllMeals"
                component={AllMeals}
                options={{
                  headerShown: true,
                  title: 'All Meals',
                }}
              />
              <Stack.Screen
                name="SingleMealLunch"
                component={SingleMealLunch}
                options={{
                  headerShown: true,
                  title: 'Lunch',
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
      </FilteredItemsProvider>
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
