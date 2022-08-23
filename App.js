import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './MainStack';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>

  );

}


const styles = StyleSheet.create({
  HomeHeader: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  ContentHeader: {

    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },

});