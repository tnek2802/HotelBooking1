import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native';


let SQLite = require('react-native-sqlite-storage');
let common = require('../CommonData');

export default class SelectRoomScreen extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          rooms: [],
          numGuest: props.route.params.numGuest,
          startDate: props.route.params.startDate,
          endDate: props.route.params.endDate,
          hotel: [],
          guest: [],
        };
        
        this.db = SQLite.openDatabase(
          {name: 'hoteldb'},
          this.openCallback,
          this.errorCallback,
        )
        this._query = this._query.bind(this);
        this._query2 = this._query2.bind(this);

      }
    
      componentDidMount() {
        this._query();
        //this._query2();
      }
    
      _query() {
        this.db.transaction(tx => 
          tx.executeSql('SELECT * FROM room ORDER BY roomId' , [], (tx, results) =>
          //console.log({rooms: results.rows.raw()})
          this.setState({rooms: results.rows.raw()})     
      ));
      //this.props.route.params.refresh()
        }
      _query2() {
        this.db.transaction(tx => 
          tx.executeSql('SELECT * FROM guestInfo' , [], (tx, results) => 
          //console.log({hotel: results.rows.raw()})
          this.setState({guest: results.rows.raw()})     
      ));
      //this.props.route.params.refresh()
    }

      openCallback() {
        console.log('database open success');
      }
    
      errorCallback(err) {
        console.log('database open error: ' + err);
      }

      render(){ 
        return (
            <View style={styles.container}>
              <Text>
              </Text>
              
            <FlatList 
            data={this.state.rooms}
            renderItem={({item}) =>
            <View>
                
                <Image style={styles.stretch} source={ImgType(item.roomType)} />
                <Text>Room Id: {item.roomId} </Text>
                <Text>Room Type: {item.roomType} </Text>
                <Text>Quantity Left: {item.quantity} </Text>
                <Text>Price: {item.price}</Text>

                <Text></Text>
                <Button
                  onPress ={() => this.props.navigation.navigate('Confirm',{
                    numGuest: this.state.numGuest,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    roomType: item.roomType,
                    roomId : item.roomId,
                    price : item.price,
                    refresh: this.props.route.params.homeRefresh,
                  })
                  }
                  
                  title= 'Book Now'
                  color="#841584"
                  />
                  <Text></Text>
            </View>
          }
            ></FlatList>
          </View>
        );
        
      }
}

function ImgType(roomType){
  if (roomType.includes('Superior Double Suite')){
    return require('../../img/SDS.jpg');
  }
  else if (roomType.includes('Superior Family Suite')){
    return require('../../img/SFS.jpg');
  }
  else if (roomType.includes('Executive Family Suite')){
    return require('../../img/EFS.jpg');
  }
  else if (roomType.includes('Celebration Family Suite')){
    return require('../../img/CFS.jpg');
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
  stretch: {
    // margin: 10,
    width: 400,
    height: 250,
    resizeMode: 'contain',
  },
});