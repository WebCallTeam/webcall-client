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
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

class Register extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.titleArea}>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View style={styles.formArea}>
            <TextInput
              style={styles.textForm}
              placeholder={"ID"}
              onChangeText={this.nameChange}
              value={userInfo.name}
            />
            <TextInput
              style={styles.textForm}
              placeholder={"PASSWORD"}
              onChangeText={this.pswChange}
              value={userInfo.psw}
            />
            <TextInput
              style={styles.textForm}
              placeholder={"PHONE"}
              onChangeText={this.phoneChange}
              value={userInfo.phone}
            />
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
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

              <Text>관리자 회원가입</Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.buttonTitle}>Register</Text>
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
    justifyContent: "space-around",
    marginBottom: hp("5%"),
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("10%"),
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("5%"),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#888",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: "1%",
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonTitle: {
    color: "white",
  },
});

export default inject("userInfo")(observer(Register));
