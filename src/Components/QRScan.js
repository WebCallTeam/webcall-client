import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";
const CUSTOMER_ORDER_PUSH_POINT =
  "https://webcall-dbserver.herokuapp.com/owner/";

class QRScan extends Component {
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
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
        />
        {scanned && (
          <Button
            title={"재시도"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });

    let { userInfo } = await this.props;

    if (!userInfo.name) {
      let nameValue = await AsyncStorage.getItem("userName");
      userInfo.setName(nameValue);
    }

    if (!userInfo.token) {
      let tokenValue = await AsyncStorage.getItem("userToken");
      userInfo.setToken(tokenValue);
    }

    try {
      let response = await fetch(CUSTOMER_ORDER_PUSH_POINT + data, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userInfo.name,
          expo_token: userInfo.token
        })
      });

      //확인 로직
      // let responseJson = await response.json();
      // console.log(responseJson);
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "115%",
    padding: 0
  }
});

export default inject("userInfo")(observer(QRScan));
