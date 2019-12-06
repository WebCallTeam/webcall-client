import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import HomeTab from './TabNavigator/HomeTab'
import OrderListTab from './TabNavigator/OrderListTab'
import ProfileTab from './TabNavigator/ProfileTab'

const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab: { screen: HomeTab },
  OrderListTab: { screen: OrderListTab },
  ProfileTab: { screen: ProfileTab }},
  {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios:{
          backgroundColor:'white',
        },
        android:{
          backgroundColor: 'white'
        }
      })
    },
    iconStyle: { height: 30 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
    indicatorStyle: { backgroundColor: "#ffffff" }
  }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
    static navigationOptions = {
      title: name='WEBCALL' ,
      headerTitleStyle: {alignSelf: 'center', textAlign: 'center', flex: 1},
      
    }

    render() {
        return <AppTabContainet/>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});