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
import { SwitchActions } from "react-navigation";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

const CUSTOMER_ENDPOINT =
  "https://webcall-dbserver.herokuapp.com/callcustomer/";
const MANAGER_ENDPOINT = "https://webcall-dbserver.herokuapp.com/owner/";

class ProfileTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-person" style={{ color: tintColor }} />
    )
  };

  clearToken = () => {
    AsyncStorage.removeItem("userToken");
    this.clearDatabase();
    setTimeout(() => this.props.navigation.navigate("Loading"), 1000);
  };

  clearDatabase = async () => {
    let { userInfo } = this.props;
    try {
      let PUSH_ENDPOINT = "";
      if (userInfo.isAdmin) {
        PUSH_ENDPOINT = MANAGER_ENDPOINT;
      } else {
        PUSH_ENDPOINT = CUSTOMER_ENDPOINT;
      }

      await fetch(PUSH_ENDPOINT + userInfo.id, {
        method: "DELETE"
      });
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("isAdmin");
    } catch {
      err => alert(err);
    }
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
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30
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

export default inject("userInfo")(observer(ProfileTab));
