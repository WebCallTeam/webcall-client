import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class Coupons extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
        <View style={StyleSheet.row}>
          <Text>테스트</Text>
          <Text>한번더</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {},
});
