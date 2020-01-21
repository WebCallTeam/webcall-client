import React, { Component } from "react";
import { userInfo } from "../store";
import { Text, View, StyleSheet, Button } from "react-native";
import { inject, observer } from "mobx-react";

class OrderCard extends Component {
  state = {
    dataOrigin: userInfo.notification.data
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          padding: 5
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30
            }}
          >
            당신의 주문정보
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: 40
            }}
          >
            {!userInfo.notification.data.number
              ? "\n\nQRCode를 사용하여\n주문을 해주세요"
              : userInfo.notification.data.type === "confirm"
              ? userInfo.notification.data.number + "입니다"
              : "주문하신 제품이 나왔습니다\n카운터로 와주세요"}
          </Text>
          {userInfo.notification.data.type === "complete" && (
            <Button
              title={"수령했습니다!"}
              onPress={() => userInfo.initNotification()}
            />
          )}
        </View>
      </View>
    );
  }
}

export default inject("userInfo", "orderInfo")(observer(OrderCard));
