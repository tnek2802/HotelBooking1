import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Footer({ navigation }) {
  

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarActiveBackgroundColor: 'grey',
        inactiveBackgroundColor: 'white',
        tabBarLabelStyle: {
          fontSize: 18,
        },
        tabBarStyle: {
         backgroundColor: 'lightgrey',
        borderRadius:60
      },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home" size={20}  />;
          },
        }}
      />
      <Tab.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="information-circle" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="chatbubble" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Reserve"
        component={ReserveScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="bed" size={20}  />;
          },
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}
