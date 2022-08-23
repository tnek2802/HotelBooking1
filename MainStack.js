import React , {useState}  from 'react';
import { Button, StyleSheet} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { getHeaderTitle } from '@react-navigation/elements';

import ReserveScreen from './screens/ReserveScreen';
import HomeScreen from './screens/HomeScreen';
import CreateBookingScreen from './screens/reserve/CreateBookingScreen';
import ViewBookingScreen from './screens/reserve/ViewBookingScreen';
import UpdateBooking from './screens/reserve/UpdateBooking';
import AboutUsScreen from './screens/AboutUsScreen';
import SelectRoomScreen from './screens/reserve/SelectRoomScreen';
import ConfirmBooking from './screens/reserve/ConfirmBooking';
import LoginScreen from './screens/LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Drawers() {
    return (
      <Drawer.Navigator
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
function HomeTabs(isAdmin) {
  return (
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
        borderRadius:60,
        paddingTop: 5,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="ios-person" size={20}  />;
          },
          headerShown: false,
        }}
      />
      {<Tab.Screen
        name={isAdmin ? "Reserve" : "Reserve"}
        component={isAdmin ? ReserveScreen : ReserveScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="bed" size={20}  />;
          },
          headerShown: false,
        }} 
      />}


    </Tab.Navigator>
  );
}

const MainStack = () =>{
  
  [isAdmin, useIsAdmin] = useState(false);
  // TODO: put placeholder function to get isAdmin from AsyncStorage, ex: callAsyncStorage(useIsAdmin)
  // useIsAdmin(asyncstorage.data)

    return (
      <Stack.Navigator screenOptions={{ headerShown: true, screenOptionStyle}} >
        <Stack.Screen name="VV Hotel" component={() => HomeTabs(isAdmin)} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Reserve" component={ReserveScreen} />
        <Stack.Screen name="Create" component={CreateBookingScreen} />
        <Stack.Screen name="ViewBook" component={ViewBookingScreen} />
        <Stack.Screen name="UpdateBooking" component={UpdateBooking} />
        <Stack.Screen name="Select" component={SelectRoomScreen} />
        <Stack.Screen name="Confirm" component={ConfirmBooking} />
        <Stack.Screen name="Login Screen" component={LoginScreen} />
      </Stack.Navigator>    
    );
}

export default MainStack


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