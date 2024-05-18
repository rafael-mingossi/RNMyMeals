import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

//// ICONS
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChartLine, faBullseye} from '@fortawesome/free-solid-svg-icons';

////SCREENS
import {Dashboard, Recipes, Goals} from '@screens';
import {AddBottomSheet} from '../components';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type BottomStackParams = {
  Dashboard: undefined;
  Recipes: undefined;
  Goals: undefined;
  AddScreenComponent: undefined;
};

type FocusedProps = {
  color: string;
  focused: boolean;
  size: number;
};

type IconWrapperProps = {
  focused: FocusedProps;
  icon: IconProp;
  label: string;
};

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
    height: 85,
    backgroundColor: '#fff',
  },
};

const AddScreenComponent = () => {
  return null;
};

const BottomIconWrapper = ({focused, icon, label}: IconWrapperProps) => {
  return (
    <View style={styles.iconWrapper}>
      <FontAwesomeIcon
        icon={icon}
        color={focused.focused ? '#16247d' : '#111'}
        size={24}
      />
      <Text style={styles.iconText}>{label}</Text>
    </View>
  );
};

///BOTTOM SCREEN OPTIONS
const bottomTabAddButtonOptions = {tabBarButton: () => <AddBottomSheet />};
const bottomTabHome = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper focused={focused} icon={faChartLine} label={'HOME'} />
  ),
};
const bottomTabGoals = {
  tabBarIcon: (focused: FocusedProps) => (
    <BottomIconWrapper focused={focused} icon={faBullseye} label={'GOALS'} />
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
      <Bottom.Screen
        name="AddScreenComponent"
        component={AddScreenComponent}
        options={bottomTabAddButtonOptions}
      />
      <Bottom.Screen name="Goals" component={Goals} options={bottomTabGoals} />
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {alignItems: 'center', justifyContent: 'center'},
  iconText: {fontSize: 12, color: '#16247d'},
});

export default BottomNavigator;
