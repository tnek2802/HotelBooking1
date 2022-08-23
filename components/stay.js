import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default class Stay extends Component<props> {
    render() {
        return (
            <View style={{ width: 170, height: 170, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, resizeMode: 'cover', width: null, height: null }}
                        source={this.props.imageUri} />
                </View>
                <View style={{
                    flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly',
                    paddingLeft: 10
                }}>
                    <Text style={{ fontSize: 14, color: '#b63838' }}>{this.props.type}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{this.props.pax}</Text>
                    <Text style={{ fontSize: 14 }}>{this.props.price}</Text>
                </View>
            </View>
        );
    }
}