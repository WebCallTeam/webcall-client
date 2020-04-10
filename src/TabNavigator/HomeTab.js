import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { QRScan, QRMake } from "../Components/";
import { NavigationEvents } from "react-navigation";
import { userInfo } from "../store";

export default class HomeTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    ),
  };
  state = {
    QRState: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillBlur={() => this.setState({ QRState: false })}
          onDidFocus={() => this.setState({ QRState: true })}
        />
        {this.state.QRState ? userInfo.isAdmin ? <QRMake /> : <QRScan /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 30,
  },
});
