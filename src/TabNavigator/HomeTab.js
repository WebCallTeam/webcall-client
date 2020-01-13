import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`${data}가 스캔되었습니다!`);
  };
}
