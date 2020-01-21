import React, { Component } from "react";
import { userInfo } from "../store";
import { Text, View, StyleSheet, Button } from "react-native";

export default class OrderCard extends Component {
  state = {
    dataOrigin: userInfo.notification.data
  };

  isCall() {
    if (this.state.dataOrigin != userInfo.notification.data) {
      this.setState({ dataOrigin: userInfo.notification.data });
      return true;
    } else return false;
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          padding: 5
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30
            }}
          >
            당신의 주문정보는
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: 40
            }}
          >
            {!userInfo.notification.data.number
              ? "QRCode를 사용하여\n주문을 해주세요"
              : userInfo.notification.data.number + "입니다"}
          </Text>
        </View>
      </View>
    );
  }
}
