import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
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
    AsyncStorage.removeItem("userToken");
    setTimeout(() => this.props.navigation.navigate("Loading"), 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 30 }} />
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={this.clearToken}>
            <Text style={styles.buttonTitle}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 30 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
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
