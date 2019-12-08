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

const PUSH_ENDPOINT = "https://webcall-dbserver.herokuapp.com/callcustomer/";

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  static navigationOptions = {
    title: (name = "WEBCALL"),
    headerTitleStyle: { alignSelf: "center", textAlign: "center", flex: 1 }
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);
    // POST the token to your backend server from where you can retrieve it to send push notifications.

    return fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        expo_token: token
      })
    });
  };

  render() {
    return (
      <View>
        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder={"Name"}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={"회원가입"}
          style={styles.contaier}
          onPress={this.registerForPushNotificationsAsync}
        />
      </View>
    );
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
