import React, {Component} from 'react';
import {Text, StyleSheet, Alert, View, TouchableNativeFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {InputWithLabel} from '../../UI';
import {FloatingAction} from 'react-native-floating-action';
const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: require('../../img/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: require('../../img/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];
let SQLite = require('react-native-sqlite-storage');
let common = require('../CommonData');
export default class ViewBookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.route.params.roomId,
      headerTitle: this.props.route.params.headerTitle,
      guest: '',
    };
    this.db = SQLite.openDatabase(
      {name: 'hoteldb'},
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
  }
  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM guestInfo WHERE roomId=?',
          [this.state.roomId],
        (tx, results) => {
          //console.log(results.rows.item(0));
          if (results.rows.length) {
            this.setState({guest: results.rows.item(0)});
          //console.log({guest: results.rows.item(0)});
          }
        },
      ),
    );
  }
  _delete() {
    Alert.alert('Confirm to delete ?', this.state.guest.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction(tx => {
            tx.executeSql('DELETE FROM guestInfo WHERE name = ?', [
              this.state.guest.name,
            ]);
          });
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }
  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }
  componentDidMount() {
    this._queryByID();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.guest.name});
  }
  render() {
    let guest = this.state.guest;
    return (
      <View style={styles.container}>
        <ScrollView>
        <TouchableNativeFeedback>
        <View style={styles.button}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'white', textAlign:'center', textDecorationLine: 'underline'}}>Guest Information</Text>
            <Text style={styles.buttonText}>Room Id: {'\t'}{guest.roomId}</Text>
            <Text style={styles.buttonText}>Name: {'\t'}{guest.name}</Text>
            <Text style={styles.buttonText}>Phone Number:{'\t'}{guest.phoneNum}</Text>
            <Text style={styles.buttonText}>Total Guest:{'\t'}{guest.quantity}</Text>
            <Text style={styles.buttonText}>Room Type: {'\t'}{guest.roomType}</Text>
            <Text style={styles.buttonText}>Price: {'\t'}{guest.price}</Text>
            <Text style={styles.buttonText}>Check In Date: {'\t'}{guest.startDate}</Text>
            <Text style={styles.buttonText}>Check Out Date: {'\t'}{guest.endDate}</Text>
        </View>
        </TouchableNativeFeedback>
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'} //   floatingIcon={( //     <Image //       source={require('./images/baseline_edit_white_18dp.png')} //     /> //   )}
          onPressItem={name => {
            switch (name) {
              case 'edit':
                this.props.navigation.navigate('UpdateBooking', {
                  roomId: guest ? guest.roomId : 0,
                  headerTitle: guest ? guest.name : '',
                  refresh: this._queryByID,
                  homeRefresh: this.props.route.params.refresh,
                });
                break;
              case 'delete':
                this._delete();
                break;
            }
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: 'black',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  button: {
    marginBottom: 30,
    width: 300,
    backgroundColor: '#2196F3',
    borderColor: 'black',
    borderWidth: 2,
    alignSelf:'center',
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'right'
  },
});