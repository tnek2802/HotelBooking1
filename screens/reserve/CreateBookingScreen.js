import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, TextInput, Button, } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

Date.prototype.formatted = function () {
    let day = this.getDay ();
    let date = this.getDate ();
    let month = this.getMonth ();
    let year = this.getFullYear ();
    let daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthsText = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
  };
  
export default class CreateBookingScreen extends Component<props> {

  constructor(props) {
      super(props);
      let date1 = new Date();
      // add a day
      date1.setDate(date1.getDate() + 1);
      let date2 = new Date();

      this.state = {
          guest: '1',
          title: '',
          hour: null,
          minute: null,
          timeText: '',
          date: new Date (Date.now ()),
          endDate: date1,
          openStartPicker: false,
          openEndPicker: false,
      };
      this.openDatePicker = this.openDatePicker.bind (this);
      this.openDatePicker1 = this.openDatePicker1.bind (this);
      this.onDateSelected = this.onDateSelected.bind (this); 
      this.onEndDateSelected = this.onEndDateSelected.bind (this);      
  }
  
  openDatePicker () {
    this.setState ({openStartPicker: true});
  }
  openDatePicker1 () {
    this.setState ({openEndPicker: true});
  }
  onDateSelected (event, value) {
    this.setState ({
      date: value,
      openStartPicker: false,
    });
  }
  onEndDateSelected (event, value) {
    this.setState ({
      endDate: value,
      openEndPicker: false,
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Number of Guests: </Text>
        
        <Picker
          style={styles.Picker}
          mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
          prompt={'Guests'}    // Android only, available in 'dialog' mode
          selectedValue={this.state.guest}
          onValueChange={
            (guest) => {
              this.setState({ guest: guest })
           }
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>

          <Text style = {styles.text}>Start Date:</Text>

        <TouchableWithoutFeedback onPress={this.openDatePicker}>
          <View>
            <TextInput
              style={styles.input}
              value={this.state.date.formatted ()}
              placeholder="Event Time"
              editable={false}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.text}>End Date:</Text>

        <TouchableWithoutFeedback onPress={this.openDatePicker1}>
          <View>
            <TextInput
              style={styles.input}
              value={this.state.endDate.formatted ()}
              placeholder="Event Time"
              editable={false}
              underlineColorAndroid={'transparent'}
            />
          </View>

        </TouchableWithoutFeedback>
        <Button
          title = "View Rates"
          onPress={() => this.props.navigation.navigate('Select',{
            numGuest: this.state.guest,
            startDate: this.state.date.formatted (),
            endDate: this.state.endDate.formatted (),
            homeRefresh: this.props.route.params.refresh,
          })
        }/>

        {this.state.openStartPicker &&
          <DateTimePicker
            value={this.state.date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            is24Hour={false}
            onChange={this.onDateSelected}
            style={styles.datePicker}
            minimumDate = {new Date (Date.now ())}
          />}

        {this.state.openEndPicker &&
          <DateTimePicker
            value={this.state.endDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            is24Hour={false}
            onChange={this.onEndDateSelected}
            style={styles.datePicker}
            minimumDate = {this.state.date}
          />}

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