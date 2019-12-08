import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginCheck from "./src/Components/LoginCheck";
import { LoginScreen, MainScreen, SignInScreen } from "./src/Screen";

const AppStack = createStackNavigator({ Main: MainScreen });
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  SignIn: SignInScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoginCheck,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
