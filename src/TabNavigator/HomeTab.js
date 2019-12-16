import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Icon } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  state = {
    scanned: false
  };

  render() {
    const { scanned } = this.state;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`${data}가 스캔되었습니다!`);
  };
}
