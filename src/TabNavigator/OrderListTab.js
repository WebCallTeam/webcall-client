import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import OrderBox from "../Components/OrderBox";

export default class OrderListTab extends Component {
  constructor(props) {
    super(props);
    this.state = { datas: datas };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.datas.map((data, index) => {
          return <OrderBox index={data.index} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
