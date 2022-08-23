import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ReserveScreen from './screens/ReserveScreen';
import HomeScreen from './screens/HomeScreen';
import AboutUsScreen from './screens/AboutUsScreen';
//import ContactUsScreen from './screens/ContactUsScreen';


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Drawers() {
    return (
      <Drawer.Navigator initialRouteName="Home"
      drawerStyle={{width: '45%', backgroundColor: 'purple'}}
      drawerType="slide"
      overlayColor="transparent"
      screenOptions={{
        drawerActiveTintColor: 'darkslateblue',
        drawerActiveBackgroundColor: 'skyblue',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Reserve" component={ReserveScreen} />
     </Drawer.Navigator>
    );
  }

const Drawer = createDrawerNavigator();
const MainStack = () =>{
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
            <Drawer.Screen name="Reserve" component={ReserveScreen} />
        </Drawer.Navigator>
      );
}

export default MainStack