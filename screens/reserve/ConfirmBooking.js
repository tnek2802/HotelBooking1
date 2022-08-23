import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, TextInput, Button, Alert, } from 'react-native';
import {Picker} from '@react-native-picker/picker';

let SQLite = require('react-native-sqlite-storage');

export default class ConfirmBooking extends Component<props> {

  constructor(props) {
      super(props);

      this.state = {
        guest: [],
        name:'',
        phoneNum:'',
        numGuest: props.route.params.numGuest,
        startDate: props.route.params.startDate,
        endDate: props.route.params.endDate,
        roomType: props.route.params.roomType,
        roomId: props.route.params.roomId,
        price: props.route.params.price,
      };  

      this._insert = this._insert.bind(this);

      this.db = SQLite.openDatabase(
        {name: 'hoteldb'},
        this.openCallback,
        this.errorCallback,
      )
  
  }
    
  _insert() {

    Alert.alert('Confirm Booking?', this.state.name,
    [
      {text:'No',
      onPress:()=>{}},
      {text:'Yes',
      onPress:()=>{{

        this.db.transaction(tx => {
          tx.executeSql('INSERT INTO guestInfo(roomType, price, phoneNum, name, startDate, endDate, quantity) VALUES(?,?,?,?,?,?,?)', [
            this.state.roomType,
            this.state.price,
            this.state.phoneNum,
            this.state.name,
            this.state.startDate,
            this.state.endDate,
            this.state.numGuest
          ],
      )});
      }; 
      this.props.route.params.refresh();
      this.props.navigation.popToTop();
    },  
         
  }
  ]
    )
  }

  componentDidMount(){
    this.props.navigation.setOptions({headerTitle: 'Create New Booking'});
  }


  openCallback() {
    console.log('database open success');
  }

  errorCallback(err) {
    console.log('database open error: ' + err);
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Please Fill In Details To Proceed... </Text>
        <Text></Text>
        <Text style = {styles.text}>Name: </Text>
        <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <Text style = {styles.text}>Phone Number: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(phoneNum) => this.setState({phoneNum})}
            value={this.state.phoneNum}
          />
            <Button onPress={this._insert}
                
                title= 'Confirm Booking'
                color="#841584"
            />                 

      </View>
      
    )
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'beige',
    borderWidth: 0.5,
    borderColor:'black',
    margin: 10,
  },
  text:{
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  Picker:{
    fontSize: 50,
    lineHeight: 30,
  },
  stretch: {
    margin: 10,
    width: 400,
    height: 350,
    resizeMode: 'contain',
  },
  input: {
    marginVertical: 20,
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});