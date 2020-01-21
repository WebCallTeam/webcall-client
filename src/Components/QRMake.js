import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import { inject, observer } from "mobx-react";
import { userInfo, orderInfo } from "../store";

class QRMake extends Component {
  shareQR = () => {
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
  render() {
    return (
      <View
        style={{ flex: 1, margin: 10, alignItems: "center", paddingTop: 30 }}
      >
        <TouchableOpacity onPress={this.shareQR}>
          <QRCode
            value={"테스트"}
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

export default inject("userInfo", "orderInfo")(observer(QRMake));
