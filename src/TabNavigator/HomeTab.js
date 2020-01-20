import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { QRScan, QRMake } from "../Components/";
import { NavigationEvents } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
            style={{
              width: "100%",
              height: hp("5%")
            }}
          >
            <View style={{ height: 30 }} />
            <TouchableOpacity
              style={{
                backgroundColor: "#46c3ad",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.setState({ StartQR: true })}
            >
              <Text style={{ color: "white" }}>QR코드인식</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
          </View>
        )}
      </View>
    );
  }
}
