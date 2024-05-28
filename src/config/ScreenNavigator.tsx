import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Login, Register, Initial} from '@screens';
import {BottomNavigator, AddFoodNavigator} from '@config';
import {useAuth} from '@providers';
import {ActivityIndicator} from 'react-native';

export type StackNavigatorParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Initial: undefined;
  AddFoodRoot: undefined;
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

////NAVIGATION FOR NON-SCREENS
export type BottomSheetPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'AddFoodRoot'
>;

const Stack = createNativeStackNavigator<StackNavigatorParams>();

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
        screenOptions={{headerShown: false}}>
        {session ? (
          <>
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="AddFoodRoot" component={AddFoodNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Initial" component={Initial} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
