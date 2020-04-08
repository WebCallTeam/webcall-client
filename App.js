import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import React, { Component } from "react";
import LoginCheck from "./src/Components/LoginCheck";
import { LoginScreen, Register } from "./src/Screen";
import { HomeTab, OrderListTab, ProfileTab } from "./src/TabNavigator";
import { Provider } from "mobx-react";
import { userInfo, orderInfo } from "./src/store";
import * as Permissions from "expo-permissions";

import { enableScreens } from "react-native-screens";
enableScreens();

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoginCheck,
      App: createMaterialTopTabNavigator(
        {
          HomeTab: { screen: HomeTab },
          OrderListTab: { screen: OrderListTab },
          ProfileTab: { screen: ProfileTab },
        },
        {
          animationEnabled: true,
          lazy: true,
          swipeEnabled: true,
          tabBarPosition: "bottom",
          tabBarOptions: {
            style: {
              ...Platform.select({
                ios: {
                  backgroundColor: "white",
                },
                android: {
                  backgroundColor: "white",
                },
              }),
            },
            iconStyle: { height: 30 },
            activeTintColor: "#000",
            inactiveTintColor: "#d1cece",
            upperCaseLabel: false,
            showLabel: false,
            showIcon: true,
            indicatorStyle: { backgroundColor: "#ffffff" },
          },
        }
      ),
      Auth: createStackNavigator(
        {
          Register: { screen: Register },
          Login: { screen: LoginScreen },
        },
        {
          initialRouteName: "Login",
        }
      ),
    },
    {
      initialRouteName: "Loading",
    }
  )
);

async function getNotificationAsync() {
  const { status, permissions } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  // if (status !== "granted") {
  //   throw new Error("Notification permission not granted");
  // }
}

export default class App extends Component {
  componentDidMount() {
    getNotificationAsync();
  }

  render() {
    return (
      <Provider userInfo={userInfo} orderInfo={orderInfo}>
        <AppContainer />
      </Provider>
    );
  }
}
