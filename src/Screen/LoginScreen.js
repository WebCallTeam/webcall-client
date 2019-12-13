import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Icon } from "native-base";

const PUSH_ENDPOINT = "https://webcall-dbserver.herokuapp.com/callcustomer/";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  static navigationOptions = {
    title: "WEBCALL",
    headerTitleStyle: { alignSelf: "center", textAlign: "center", flex: 1 }
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
      Permissions.CAMERA
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);
    // POST the token to your backend server from where you can retrieve it to send push notifications.

    AsyncStorage.setItem("userToken", token);

    fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        expo_token: token
      })
    });

    return this.props.navigation.navigate("Loading");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>회원가입</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput
            style={styles.textForm}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder={"Name"}
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.registerForPushNotificationsAsync}
          >
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center"
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center"
  },
  title: {
    fontSize: wp("10%")
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("5%")
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#888",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5
  },
  textLink: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "flex-end"
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
