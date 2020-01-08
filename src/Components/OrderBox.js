import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { inject, observer } from "mobx-react";
import { userInfo, orderInfo } from "../store";

const PUSH_ENDPOINT = "https://webcall-dbserver.herokuapp.com/owner/";

class OrderBox extends Component {
  constructor(props) {
    super(props);
    //this.getOrderData();
  }

  state = {
    orderData: ""
  };

  // 주문 완료 버튼
  callCustomer = () => {
    // 점장의 경우기 때문에
    // 점장이 가지고 있는 리스트에 저장되 있는 token 정보를 읽어오는 로직
    // const {userInfo} = this.props;
    // const {orderInfo} = this.props;
    // try {
    //   let response = await fetch(PUSH_ENDPOINT + userInfo.id, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       number: orderInfo.orderNumber,
    //       password: "default",
    //       expo_token: token
    //     })
    //   });
    //   let responseJson = await response.json();
    //   this.setNotification(responseJson.data);
    //   //console.log(responseJson);
    // } catch (err) {
    //   console.log(err);
    // }
    // order를 마무리 짓는 로직이 완성되면 그 때 이 로직을 보내기로
  };

  deleteList = value => {
    this.props.unMount();
  };

  render() {
    return (
      <View style={styles.elem}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{this.props.index}번 주문</Text>
        </View>
        <View style={styles.userComment}>
          <TouchableOpacity style={styles.button} onPress={this.callCustomer}>
            <Text>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.deleteList}>
            <Text>제거</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#eee",
    borderBottomWidth: 0.5,
    padding: 5
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  userComment: {
    padding: 8,
    borderRadius: 5,
    flexDirection: "row"
  },
  name: {
    paddingLeft: 10
  },
  button: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#46c3ad"
  }
});

export default inject("userInfo", "orderInfo")(observer(OrderBox));
