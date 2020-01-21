import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import { inject, observer } from "mobx-react";
import { Notifications } from "expo";
import { userInfo } from "../store";

class LoginCheck extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );

    this.initializeInfo();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate(userToken ? "App" : "Auth");
    //this.props.navigation.navigate("Auth");
  };

  initializeInfo = async () => {
    let idInfo = await AsyncStorage.getItem("userId");
    let nameInfo = await AsyncStorage.getItem("userName");
    let tokenInfo = await AsyncStorage.getItem("userToken");

    userInfo.setName(nameInfo);
    userInfo.setId(idInfo);
    userInfo.setToken(tokenInfo);
  };

  handleNotification = async value => {
    const { userInfo } = await this.props;

    userInfo.setNotification(value);
    // userInfo.addNotification(value);

    const oldOrderData = await AsyncStorage.getItem("orderData");

    let newOrderData = JSON.parse(oldOrderData);
    if (!newOrderData) {
      newOrderData = [];
    }
    newOrderData.push(value);

    userInfo.setOrderList(newOrderData);
    await AsyncStorage.setItem("orderData", JSON.stringify(newOrderData))
      .then(() => {
        console.log("Save Complete!");
      })
      .catch(() => {
        console.log("There was an error saving the orderData");
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default inject("userInfo")(observer(LoginCheck));
