import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "native-base";
import {
  SwitchActions,
  NavigationActions,
  StackActions
} from "react-navigation";

export default class ProfileTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-person" style={{ color: tintColor }} />
    )
  };

  clearToken = () => {
    AsyncStorage.clear();
    this.props.navigation.dispatch(StackActions.popToTop());
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={this.clearToken}>
            <Text style={styles.buttonTitle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonArea: {
    width: "100%",
    height: hp("5%")
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitle: {
    color: "white"
  }
});
