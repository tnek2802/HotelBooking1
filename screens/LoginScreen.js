import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class LoginScreen extends Component<props>{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        };
    }
    componentDidUpdate() {
        this.props.navigation.setOptions({headerTitle: 'Admin Login'});
      }

      _read() {
        let success = false;
        let url = `${Config.API_URL}:${Config.API_PORT}/api/login`;
    
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
          .then(response => {
            if (!response.ok) {
              success = false;
              throw Error('Error ' + response.status);
            } else {
              success = true;
            }
    
            return response.json();
          })
    
          .then(data => {
            if (success) {
              this._saveSettings(
                data.username,
                data.password,
                data.message,
              );
    
              setToken(data.token);
              syncToServer('pull');
    
              console.log('THIS IS MESSAGE: ');
              console.log(data.message);
    
              Alert.alert(data.message, 'Welcome, ' + data.username + '!');
              this.props.navigation.navigate('Home');
            } else {
              Alert.alert(data.message);
            }
          })
          .catch(data => {
            Alert.alert(data.message, 'Username or password incorrect');
          });
      }

    render(){
        const pressHandler = () => {
            if (this.state.username === '') {
              Alert.alert('Please enter your username.');
            } else if (this.state.password === '') {
              Alert.alert('Please enter your password.');
            } else {
              this._read();
            }
          };
        return(
            <View style={styles.container}>
                <Image source={require('../img/vv.jpeg')} style={styles.logo} />
                <TextInput style={styles.input} placeholder="Admin Username"
                    onChangeText={(username) => this.setState({username})} value={this.state.usernamename}/>
                <TextInput style={styles.input} placeholder="Password"
                    onChangeText={(password) => this.setState({password})} value={this.state.password} secureTextEntry={true}/>
                <TouchableOpacity 
                    style={styles.button}>
                    <Text style={styles.buttonWord}>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        padding: 10,
    },
    logo:{
        width: 200,
        height: 300,
        maxWidth: 300,
    },
    input:{
        textAlign: 'center',
        backgroundColor:'lightgrey',
        width: 300,
        borderColor: 'black',
        borderWidthL:1,
        borderRadius:5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    button:{
        backgroundColor:'black',
        width: 200,
        borderColor: 'white',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    buttonWord:{
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        margin: 5,
        padding: 10,
    },
});