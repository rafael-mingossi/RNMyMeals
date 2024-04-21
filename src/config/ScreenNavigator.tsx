import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Login, Register} from '@screens';
import {BottomNavigator} from '@config';

export type StackNavigatorParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type LoginStack = NativeStackScreenProps<StackNavigatorParams, 'Login'>;
export type RegisterStack = NativeStackScreenProps<
  StackNavigatorParams,
  'Register'
>;
const Stack = createNativeStackNavigator<StackNavigatorParams>();

const ScreenNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
