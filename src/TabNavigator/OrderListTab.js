import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

export default class OrderListTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>14번 주문</Text>
          </View>
          <View style={styles.userComment}>
            <TouchableOpacity style={styles.button}>
              <Text>호출</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>15번 주문</Text>
          </View>
          <View style={styles.userComment}>
            <View style={styles.button}>
              <Text>호출</Text>
            </View>
            <View style={styles.button}>
              <Text>삭제</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  elem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#eee",
    borderBottomWidth: 0.5,
    padding: 5
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  userComment: {
    padding: 8,
    borderRadius: 5,
    flexDirection: "row"
  },
  name: {
    paddingLeft: 10
  },
  button: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#46c3ad"
  }
});
