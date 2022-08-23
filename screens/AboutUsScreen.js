import { CurrentRenderContext } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Button } from 'react-native';
import Stay from '../components/stay';

export default class AboutUsScreen extends Component<Props>  {
  render() {
    return (
      <ScrollView 
        showsVerticalScrollIndicator = {false}
      >
       {/*About VV Hotel section*/}
        <View>
          <Text style={styles.header}> About VV Hotel</Text>
          <Image style={styles.stretch} source={require('../img/hotel2.jpg')}></Image>
          <Text style={styles.text}>VV Hotel offers lodgings close to the hubbub of the city’s downtown,
            in the core of the Golden Triangle. Several amenities featured in Wei Hotel included a buffet with a variety
            of Asian and foreign cuisine, an outdoor swimming pool, mini cinema, a wedding reception, spa treatment, etc.
            Visitors can enjoy all the amenities provided all the time.
            The Petronas Twin Towers and Suria KLCC are all within 1150 feet of each other,
            whereas Aquaria KLCC is 2950 feet distant. At Wei Kuala Lumpur, raise the bar and then leap over it.</Text>
          <Text> </Text>
          

          {/*Gallery section*/}
          <View style={styles.galleryContainer}>
            <Text style={styles.header}>Gallery</Text>
            <Image style={styles.gallery} source={require('../img/hotel4.jpg')}></Image>
            <Text style={styles.text}>Description</Text>
            <Text> </Text>
            <Image style={styles.gallery} source={require('../img/hotel1.jpg')}></Image>
            <Text style={styles.text}>Description</Text>
            <Text> </Text>
            <Image style={styles.gallery} source={require('../img/hotel2.jpg')}></Image>
            <Text style={styles.text}>Description</Text>
            <Text> </Text>
            <Image style={styles.gallery} source={require('../img/hotel3.jpg')}></Image>
            <Text style={styles.text}>Description</Text>
          </View>

          {/* Stay section*/}
          <Text> </Text>
          <Text style={styles.header}>Stay</Text>
          <View style={{ marginTop: 5}}>
            <View style={{ paddingHorizontal: 20, marginTop: 20, 
              flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <Stay
                imageUri={require('../img/hotel4.jpg')}
                type= 'LUXURY SINGLE - 1 BED'
                pax= '1 - 2 Pax'
                price= 'RM500/night'
                /> 
              <Stay
                imageUri={require('../img/hotel3.jpg')}
                type= 'GRAND DELUXE - 1 BED'
                pax= '2 - 3 Pax'
                price= 'RM700/night'
              />
              <Stay
                imageUri={require('../img/hotel2.jpg')}
                type= 'JUNIOR SUITE - 2 BED'
                pax= '4 - 5 Pax'
                price= 'RM900/night'
              />
              <Stay
                imageUri={require('../img/hotel1.jpg')}
                type= 'GRAND SUITE - 2 BED'
                pax= '4 - 5 Pax'
                price= 'RM1100/night'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  galleryContainer: {
    backgroundColor: '#F0E9DA',
  },
  stretch: {
    margin: 10,
    width: 400,
    height: 250,
    resizeMode: 'contain',
  },
  gallery: {
    borderRadius: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 10,
    flex: 1,
    width: 250,
    height: 250,
  },
  text: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: 5,
  }
});