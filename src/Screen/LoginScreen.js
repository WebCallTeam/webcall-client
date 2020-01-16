import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  CheckBox,
  Switch,
  Platform
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";
import { Icon } from "native-base";

const PUSH_ENDPOINT = "https://webcall-dbserver.herokuapp.com/callcustomer/";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
  }

  state = {
    notification: null,
    name: "",
    messageText: "",
    check: false
  };
  static navigationOptions = {
    title: "WEBCALL",
    headerTitleStyle: { alignSelf: "center", textAlign: "center", flex: 1 }
  };

  registerForPushNotificationsAsync = async () => {
    setTimeout(() => {}, 1000);
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
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

    // Stop here no the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // testing local
    //let token = "this is a local token";
    AsyncStorage.setItem("userToken", token);

    const { userInfo } = await this.props;

    try {
      let response = await fetch(PUSH_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userInfo.name,
          expo_token: token
        })
      });

      let responseJson = await response.json();

      //console.log(responseJson);
      this.nameChange("");
      return this.props.navigation.navigate("Loading");
    } catch (err) {
      console.log(err);
    }
  };

  nameChange(value) {
    const { userInfo } = this.props;
    userInfo.setName(value);
    //this.setState({ name: value });
  }

  notificationChange = value => {
    const { userInfo } = this.props;
    userInfo.setNotification(value);
  };

  handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    const { userInfo } = this.props;
    //const { name } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.titleArea}>
            <Text style={styles.title}>WEBCALL</Text>
          </View>
          <View style={styles.formArea}>
            <TextInput
              style={styles.textForm}
              placeholder={"ID"}
              onChangeText={this.nameChange}
              value={userInfo.name}
            />
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              {Platform.OS === "ios" ? (
                <Switch
                  value={this.state.check}
                  onValueChange={() =>
                    this.setState({ check: !this.state.check })
                  }
                />
              ) : (
                <CheckBox
                  value={this.state.check}
                  onValueChange={() =>
                    this.setState({ check: !this.state.check })
                  }
                />
              )}
              <Text>관리자 로그인</Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.registerForPushNotificationsAsync}
            >
              <Text style={styles.buttonTitle}>login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "space-around"
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
    marginBottom: "5%"
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

export default inject("userInfo")(observer(LoginScreen));
