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

class LoginCheck extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const { userInfo } = await this.props;

    if (userInfo.notification.origin == "selected") {
      let orderData = await AsyncStorage.getItem(
        "orderData",
        (error, result) => {
          if (error) {
            orderData = null;
          }
        }
      );

      if (orderData == null) {
        AsyncStorage.setItem("orderData", userInfo.notification.data);
      } else {
        AsyncStorage.mergeItem("orderData", userInfo.notification.data);
      }
    }

    this.props.navigation.navigate(userToken ? "App" : "Auth");
    //this.props.navigation.navigate("App");
  };

  handleNotification = value => {
    const { userInfo } = this.props;

    userInfo.setNotification(value);
    userInfo.addNotification(value);
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
