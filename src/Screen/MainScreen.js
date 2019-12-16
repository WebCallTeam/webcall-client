import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { HomeTab, OrderListTab, ProfileTab } from "../TabNavigator";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomeTab: { screen: HomeTab },
    OrderListTab: { screen: OrderListTab },
    ProfileTab: { screen: ProfileTab }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          ios: {
            backgroundColor: "white"
          },
          android: {
            backgroundColor: "white"
          }
        })
      },
      iconStyle: { height: 30 },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true,
      indicatorStyle: { backgroundColor: "#ffffff" }
    }
  }
);

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  static navigationOptions = {
    title: (name = "WEBCALL"),
    headerTitleStyle: { alignSelf: "center", textAlign: "center", flex: 1 }
  };

  render() {
    return <AppTabContainet />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
