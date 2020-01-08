import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { HomeTab, OrderListTab, ProfileTab } from "../TabNavigator";
import { inject, observer } from "mobx-react";
import { Notifications } from "expo";

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

class MainScreen extends Component {
  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = async value => {
    const { userInfo } = this.props;

    this.props.navigation.navigate("OrderListTab");
  };

  render() {
    return <AppTabContainet />;
  }
}

export default inject("userInfo")(observer(MainScreen));
