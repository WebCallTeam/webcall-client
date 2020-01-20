import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default class QRMake extends Component {
  shareQR = () => {
    this.svg.toDataURL(data => {
      FileSystem.writeAsStringAsync(
        FileSystem.cacheDirectory + "/QRCode.png",
        data,
        { encoding: FileSystem.EncodingType.Base64 }
      ).then(success => {
        console.log(FileSystem.cacheDirectory + "/QRCode.png");
        Sharing.shareAsync(FileSystem.cacheDirectory + "/QRCode.png");
      });
    });
  };
  render() {
    <View style={{ flex: 1, margin: 10, alignItems: "center", paddingTop: 30 }}>
      <TouchableOpacity onPress={this.shareQR}>
        <QRCode
          value={"ID"}
          size={250}
          bgColor="#000"
          fgColor="#fff"
          quietZone="10"
          getRef={ref => (this.svg = ref)}
        />
      </TouchableOpacity>
    </View>;
  }
}
