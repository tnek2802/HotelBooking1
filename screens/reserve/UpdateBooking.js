import React, { Component } from 'react';
import { Button, StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../../UI';
import {Picker} from '@react-native-picker/picker';

let SQLite = require('react-native-sqlite-storage');

export default class UpdateBooking extends Component {

  constructor(props) {
      super(props);

      this.state = {
        guest: [],
        function:'',
        name:'',
        phoneNum:'',
        numGuest: '',
        startDate: '',
        endDate: '',
        roomType: '',
        roomId: props.route.params.roomId,
        price: '',
        headerTitle: props.route.params.headerTitle,
      };  

      this._update = this._update.bind(this);
      this._query = this._query.bind(this);

      this.db = SQLite.openDatabase(
        {name: 'hoteldb'},
        this.openCallback,
        this.errorCallback,
      )
  
  }
  _query() {
    this.db.transaction(tx => 
      tx.executeSql('SELECT * FROM guestInfo WHERE roomId=?', [this.state.roomId], (tx, results) =>
      {
        //console.log(results.rows.item(0));
        if (results.rows.length) {
          this.setState({
            name: results.rows.item(0).name,
            phoneNum: results.rows.item(0).phoneNum,
            numGuest: results.rows.item(0).quantity,
            startDate: results.rows.item(0).startDate,
            endDate: results.rows.item(0).endDate,
            roomType: results.rows.item(0).roomType,
            price: results.rows.item(0).price,
          });
        }
      },  
  ));
    }
    
  _update() {

    Alert.alert('Confirm To Update?', this.state.name,
    [
      {text:'No',
      onPress:()=>{}},
      {text:'Yes',
      onPress:()=>{

        this.db.transaction(tx => {
          tx.executeSql('UPDATE guestInfo SET name =?,roomType=?,quantity=?,price=?,phoneNum=?,startDate=?,endDate=? WHERE roomId=?', [
            this.state.name,
            this.state.roomType,
            this.state.numGuest,
            this.state.price,
            this.state.phoneNum,
            this.state.startDate,
            this.state.endDate,
            this.state.roomId,
          ],
          (_, results) => {
            console.log("updated: " + results);
          },
          (_, error) => {
            console.log("error: " + error)
          }
      )});
        this.props.route.params.refresh();
        this.props.route.params.homeRefresh();
        this.props.navigation.goBack();
      }},
    ]
    )

  }

  componentDidMount(){
    this._query();
  }

  componentDidUpdate(){
    this.props.navigation.setOptions({headerTitle: 'Update Guest Info'});
  }

  openCallback() {
    console.log('database open success');
  }

  errorCallback(err) {
    console.log('database open error: ' + err);
  }

  render() {

    return (
      <View style={styles.container}>
      <ScrollView>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          value={this.state.name}
          onChangeText={name => {
            this.setState({name});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Phone Number'}
          value={this.state.phoneNum}
          onChangeText={phoneNum => {
            this.setState({phoneNum});
          }}
          keyboardType={'email-address'}
          orientation={'vertical'}
        />
        <View style={styles.buttonWrapper}>
          <AppButton
            style={styles.buttonStyles}
            title={'Save'}
            theme={'primary'}
            onPress={this._update}
          />
        </View>
      </ScrollView>
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
    paddingRight: 50
  },
  TextLabel:{
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  TextInput:{
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    backgroundColor: "rgba(32,32,32,0.4)"
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
  buttonWrapper: {
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'center',
  }
});