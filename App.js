import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { Component } from "react";
import LoginCheck from "./src/Components/LoginCheck";
import { LoginScreen, MainScreen } from "./src/Screen";
import { Provider } from "mobx-react";
import { userInfo, orderInfo } from "./src/store";
import * as Permissions from "expo-permissions";

const AppStack = createStackNavigator({ Main: MainScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppContainer = createAppContainer(
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

async function getNotificationAsync() {
  const { status, permissions } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  // if (status !== "granted") {
  //   throw new Error("Notification permission not granted");
  // }
}

class App extends Component {
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

export default App;
