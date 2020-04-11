import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { inject, observer } from "mobx-react";

class Coupons extends Component {
  state = {
    couponCount: 4,
  };
  makeCouponList() {
    let couponCountTmp = this.state.couponCount;
    const couponList = [];
    for (let i = 0; i < 10; i++) {
      if (couponCountTmp-- > 0)
        couponList.push(
          <Image
            source={require("../../assets/O.png")}
            style={{
              width: "20%",
              aspectRatio: 1,
            }}
          />
        );
      else
        couponList.push(
          <Image
            source={require("../../assets/X.png")}
            style={{
              width: "20%",
              aspectRatio: 1,
            }}
          />
        );
    }
    return couponList;
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {this.makeCouponList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {},
});

export default inject("userInfo", "orderInfo")(observer(Coupons));
