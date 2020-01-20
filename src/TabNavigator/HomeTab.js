import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Icon } from "native-base";
import QRScan from "../Components/QRScan";
import { NavigationEvents } from "react-navigation";

export default class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  state = {
    StartQR: false
  };

  render() {
    //return this.props.isFocused ? <QRScan /> : null;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillBlur={() => this.setState({ StartQR: false })}
        />
        {this.state.StartQR ? (
          <View style={{ flex: 1 }}>
            <View style={{ height: 30 }} />
            <QRScan />
            <View style={{ height: 30 }} />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ height: 30 }} />
            <Button
              style={{
                height: "50%",
                justifyContent: "center",
                alignItems: "center"
              }}
              title={"QR코드인식"}
              onPress={() => this.setState({ StartQR: true })}
            />
            <View style={{ height: 30 }} />
          </View>
        )}
      </View>
    );
  }
}
