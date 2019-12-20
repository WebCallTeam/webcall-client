import React, { Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export default class OrderBox extends Component {
  constructor(props) {
    super(props);
  }

  callCustomer = () => {};

  deleteList = () => {};

  render() {
    return (
      <View style={styles.elem}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{this.props.index}번 주문</Text>
        </View>
        <View style={styles.userComment}>
          <TouchableOpacity style={styles.button} onPress={this.callCustomer}>
            <Text>호출</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.deleteList}>
            <Text>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
