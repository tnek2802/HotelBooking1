import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';

let SQLite = require('react-native-sqlite-storage');
const actions = [
  {
    text: 'Add',
    icon: require('../img/add_icon.png'),
    name: 'add',
    position: 1,
  },
];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: [],
    };
    this._query = this._query.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'hoteldb', createFromLocation: '~db.sqlite'},
      this.openCallback,
      this.errorCallback,
    );
  }
  componentDidMount() {
    this._query();
  }
  _query() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM guestInfo ORDER BY roomId', [], (tx, results) =>
        this.setState({guest: results.rows.raw()}),
      ),
    );

  }
  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:30, fontWeight:'bold', color:'black', textAlign:'center', textDecorationLine: 'underline', paddingBottom:10}}>Guest List</Text>
        <FlatList
          data={this.state.guest}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('ViewBook', {
                  roomId: item.roomId,
                  headerTitle: item.name,
                  refresh: this._query,
                });
              }}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Guest Name: {item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  Room Type: {item.roomType}
                </Text>
                <Text style={styles.itemSubtitle}>
                  Check In Date: {item.startDate}
                </Text>
                <Text style={styles.itemSubtitle}>
                  Check Out Date: {item.endDate}
                </Text>
              </View>
            </TouchableHighlight>
          )}

        />
        <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#a80000'}
          onPressItem={() => {
            this.props.navigation.navigate('Create', {
              refresh: this._query,
            });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 18,
  },
});