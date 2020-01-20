import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import { Icon } from "native-base";

import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  state = {
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <View style={{ height: 30 }} />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ flex: 1 }}
        />

        {scanned && (
          <Button
            title={"재시도"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
        <View style={{ height: 30 }} />
      </View>
    );
  }

  // send order information to owner
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });

    let userName = AsyncStorage.getItem("userName");
    let token = AsyncStorage.getItem("userToken");

    try {
      let response = await fetch(data, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          expo_token: token
        })
      });

      return this.props.navigation.navigate("HomeTab");
    } catch (err) {
      console.log(err);
    }
  };

  sendNewOrder = async endpoint => {
    let userName = AsyncStorage.getItem("userName");
    let userToken = AsyncStorage.getItem("userToken");

    try {
      let response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          expo_token: userToken
        })
      });

      let responseJson = await response.json();

      this.nameChange("");

      // set it for owner id
      // AsyncStorage.setItem("userID", responseJson.id);
      // this.setState({ id: responseJson.id });

      return this.props.navigation.navigate("Loading");
    } catch (err) {
      console.log(err);
    }
  };
}
