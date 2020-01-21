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

const CUSTOMER_ENDPOINT =
  "https://webcall-dbserver.herokuapp.com/callcustomer/";
const MANAGER_ENDPOINT = "https://webcall-dbserver.herokuapp.com/owner/";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
    this.initialize();
  }

  state = {
    notification: null,
    name: "",
    messageText: "",
    check: false,
    id: ""
  };
  static navigationOptions = {
    title: "WEBCALL",
    headerTitleStyle: { alignSelf: "center", textAlign: "center", flex: 1 }
  };

  initialize = async () => {
    const { userInfo } = this.props;
    userInfo.token = await AsyncStorage.getItem("userToken");
  };

  registerForPushNotificationsAsync = async () => {
    setTimeout(() => {}, 2000);
    const { userInfo } = await this.props;
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

    let requestMethod = "";
    //let tokenValue = "ExponentPushToken[EF0j3iAyND7CcI7ujOqveo]";

    let PUSH_ENDPOINT = userInfo.isAdmin ? MANAGER_ENDPOINT : CUSTOMER_ENDPOINT;
    await AsyncStorage.setItem(
      "userAdmin",
      userInfo.isAdmin ? "true" : "false"
    );
    // owner update X
    if (userInfo.token === null) {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      await AsyncStorage.setItem("userToken", token);
      userInfo.setToken(token);

      requestMethod = "POST";
    } else {
      requestMethod = "PUT";
    }
    // check if customer or manager

    //let PUSH_ENDPOINT = CUSTOMER_ENDPOINT;
    // set it for owner id
    await AsyncStorage.setItem("userName", userInfo.name);

    try {
      // need to look into axios break point
      let responseData = await fetch(PUSH_ENDPOINT, {
        method: requestMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userInfo.name,
          expo_token: userInfo.token
        })
      })
        .then(res => res.json())
        .then(responseJson => {
          if (requestMethod == "POST") {
            userInfo.setId(responseJson.id);
            let idString = JSON.stringify(responseJson.id);
            idString = idString.replace("[", "").replace("]", "");
            AsyncStorage.setItem("userId", idString);
          }
        })
        .catch(err => alert(err));
      // erase information
      this.nameChange("");

      return this.props.navigation.navigate("HomeTab");
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

  toggleAdmin = () => {
    let { userInfo } = this.props;

    userInfo.toggleAdmin();
  };

  render() {
    const { userInfo } = this.props;
    //const { name } = this.state;
    // let unknownValue = Object.values(AsyncStorage.getItem("userToken"));
    // let tokenValue = AsyncStorage.getItem("userToken");

    // alert(unknownValue);
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
                  value={userInfo.isAdmin}
                  onValueChange={this.toggleAdmin}
                />
              ) : (
                <CheckBox
                  value={userInfo.isAdmin}
                  onValueChange={this.toggleAdmin}
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
              <Text style={styles.buttonTitle}>Login</Text>
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
