import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React, { Component } from "react";
import LoginCheck from "./src/Components/LoginCheck";
<<<<<<< HEAD
import { LoginScreen, MainScreen, SignInScreen } from "./src/Screen";
import { Provider } from "mobx-react";
import { userInfo } from "./src/store";
=======
import { LoginScreen, MainScreen } from "./src/Screen";
>>>>>>> origin/master

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
