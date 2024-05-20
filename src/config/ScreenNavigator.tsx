import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Login, Register, Initial} from '@screens';
import {BottomNavigator} from '@config';
import {useAuth} from '@providers';
import {ActivityIndicator} from 'react-native';

export type StackNavigatorParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Initial: undefined;
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

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const ScreenNavigator = () => {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={session ? 'Home' : 'Initial'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
