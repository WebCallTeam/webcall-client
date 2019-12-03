import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

export default class MainScreen extends Component {
    static navigationOptions = {
        title: name='WEBCALL' ,
        headerTitleStyle: {
           
        },
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>MainScreen</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});