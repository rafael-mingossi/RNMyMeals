import React from 'react';
import {Platform, Text, View} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

//// ICONS
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChartLine,
  faPlus,
  faBullseye,
} from '@fortawesome/free-solid-svg-icons';

////SCREENS
import {Dashboard, Recipes, Goals} from '@screens';

export type BottomStackParams = {
  Dashboard: undefined;
  Recipes: undefined;
  Goals: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParams>();

const screenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: '#fff',
  },
};

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesomeIcon
                  icon={faChartLine}
                  color={focused ? '#16247d' : '#111'}
                  size={24}
                />
                <Text style={{fontSize: 12, color: '#16247d'}}>HOME</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#16247d',
                  width: Platform.OS === 'ios' ? 50 : 60,
                  height: Platform.OS === 'ios' ? 50 : 60,
                  top: Platform.OS === 'ios' ? -10 : -20,
                  borderRadius: Platform.OS === 'ios' ? 25 : 30,
                }}>
                <FontAwesomeIcon
                  icon={faPlus}
                  color={focused ? '#16247d' : '#fff'}
                  size={24}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesomeIcon
                  icon={faBullseye}
                  color={focused ? '#16247d' : '#111'}
                  size={24}
                />
                <Text style={{fontSize: 12, color: '#16247d'}}>GOALS</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
