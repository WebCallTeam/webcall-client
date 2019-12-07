import React, { Component } from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/Components/MainScreen";
import { Provider } from "mobx-react";
import Store from "./src/store/Store";

export default class App extends Component {
  render() {
    const AppStackNavigator = createStackNavigator({
      Main: {
        screen: MainScreen
      }
    });

    const AppContainer = createAppContainer(AppStackNavigator);

    return (
      <Provider Store={Store}>
        <AppContainer />
      </Provider>
    );
  }
}
