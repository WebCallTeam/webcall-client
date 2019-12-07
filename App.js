import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './Components/MainScreen';
import SignInScreen from './Components/Auth/SignInScreen'
import LoginCheck from './Components/Auth/LoginCheck'
import LoginScreen from './Components/Auth/LoginScreen';

const AppStack = createStackNavigator({ Main: MainScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const AuthCheck = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    Loading: AuthCheck,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  }
));