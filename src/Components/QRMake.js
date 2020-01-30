import React, { Component } from "react";
import { View, TouchableOpacity, AsyncStorage } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

class QRMake extends Component {
  constructor(props) {
    super(props);
    this.id = "-100";
  }
  shareQR = () => {
    this.getId();
    this.svg.toDataURL(data => {
      FileSystem.writeAsStringAsync(
        FileSystem.cacheDirectory + "/QRCode.png",
        data,
        { encoding: FileSystem.EncodingType.Base64 }
      ).then(success => {
        Sharing.shareAsync(FileSystem.cacheDirectory + "/QRCode.png");
      });
    });
  };

  getId = async () => {
    let { userInfo } = this.props;
    if (!userInfo.id) {
      let idValue = await AsyncStorage.getItem("userId");
      userInfo.setId(idValue);
    }
  };

  checkForId = async () => {
    if (userInfo.id === null) {
      userInfo.id = await AsyncStorage.getItem("userId");
      alert(userInfo.id);
    }
  };

  render() {
    const { userInfo } = this.props;
    return (
      <View
        style={{ flex: 1, margin: 10, alignItems: "center", paddingTop: 30 }}
      >
        <TouchableOpacity onPress={this.shareQR}>
          <QRCode
            value={userInfo.id.toString()}
            size={250}
            bgColor="#000"
            fgColor="#fff"
            quietZone="10"
            getRef={ref => (this.svg = ref)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default inject("userInfo")(observer(QRMake));
