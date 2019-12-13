import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { Component } from "react";
import LoginCheck from "./src/Components/LoginCheck";
import { LoginScreen, MainScreen, SignInScreen } from "./src/Screen";
import { Provider } from "mobx-react";
import { userInfo } from "./src/store";

const AppStack = createStackNavigator({ Main: MainScreen });
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  SignIn: SignInScreen
});

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

export default class App extends Component {
  render() {
    return (
      <Provider userInfo={userInfo}>
        <AppContainer />
      </Provider>
    );
  }
}

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoginCheck,
//       App: AppStack,
//       Auth: AuthStack
//     },
//     {
//       initialRouteName: "Loading"
//     }
//   )
// );
