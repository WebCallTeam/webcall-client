import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginCheck from "./src/Components/LoginCheck";
import { LoginScreen, MainScreen } from "./src/Screen";

const AppStack = createStackNavigator({ Main: MainScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen });

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
