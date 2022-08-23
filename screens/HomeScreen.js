import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';


export default class HomeScreen extends Component<Props> {
    /**
     * A screen component can set navigation options such as the title.
     */
     render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.image} source = {require('../img/hotel1.jpg')}>
                    <Text style={styles.title}>VV Hotel</Text>
                </ImageBackground>
                <Button
                onPress={() => this.props.navigation.navigate('Login Screen')}
                title= "Admin Login"
                >

                </Button>
            </View>

                
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -5, height: 5},
        textShadowRadius: 20,
    },
    button: {
        marginVertical: 10,
        paddingHorizontal: 100,
    },

    image:{
        justifyContent: "center",
        marginLeft: 15,
        width: 360,
        height: 360,
    },
});
