import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Platform
} from "react-native";
import { inject, observer } from "mobx-react";
import { userInfo, orderInfo } from "../store";
import Dialog from "react-native-dialog";

const PUSH_ENDPOINT = "https://webcall-dbserver.herokuapp.com/owner/1";
const MANAGER_TO_CALLCUSTOMER =
  "https://webcall-dbserver.herokuapp.com/callcustomer/";

class OrderBox extends Component {
  constructor(props) {
    super(props);
    //this.getOrderData();
  }

  // 주문번호는 local에서 관리 , mobx 사용안함
  state = {
    tmpOrder: "",
    orderData: "",
    name: this.props.userInfo.notification.data.name,
    dialogVisible: false,
    token: ""
  };

  // 주문 완료 버튼
  callCustomerWhenDone = async () => {
    // 점장의 경우기 때문에
    // 점장이 가지고 있는 리스트에 저장되 있는 token 정보를 읽어오는 로직
    const { userInfo } = await this.props;
    try {
      let response = await fetch(PUSH_ENDPOINT + userInfo.id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          number: this.state.orderData,
          expo_token: token
        })
      });

      //확인 로직
      // let responseJson = await response.json();
      // console.log(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  deleteList = async () => {
    userInfo.orderList.splice(this.props.arrayIndex, 1);
    await AsyncStorage.setItem("orderData", JSON.stringify(userInfo.orderList));
  };
  handleOrderData = async () => {
    try {
      // token data from mobx
      // https://reactjs.org/docs/lists-and-keys.html why use arrayKey instead of key
      let token = await userInfo.orderList[this.props.arrayIndex].data.token;

      let response = await fetch(MANAGER_TO_CALLCUSTOMER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          number: userInfo.orderList[this.props.arrayIndex].data.number,
          expo_token: token
        })
      });
    } catch (err) {
      console.log(err);
    }
    this.setState({ dialogVisible: false });
  };

  handleDialog(data, index) {
    // this.setState({ tmpOrder: data });
    data.nativeEvent.text = data.nativeEvent.text.replace(/[^0-9]/g, "");
    userInfo.setOrderNumber(data.nativeEvent.text, index);
  }

  openDialog = () => {
    this.setState({ tmpOrder: "" });
    this.setState({ dialogVisible: true });
  };

  onCancel = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <View style={styles.elem}>
        <View style={styles.userInf}>
          <Text style={styles.name}>
            {userInfo.orderList[this.props.arrayIndex].data.name + "님의 주문"}
          </Text>
          <Text style={styles.name}>
            {userInfo.orderList[this.props.arrayIndex]
              ? userInfo.orderList[this.props.arrayIndex].data.number +
                " 번 주문"
              : "주문 번호를 지정해주세요"}
          </Text>
        </View>
        <View style={styles.userComment}>
          {this.state.orderData ? (
            <TouchableOpacity
              style={styles.button}
              onPress={this.callCustomerWhenDone}
            >
              <Text>호출</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={this.openDialog}>
              <Text>확인</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={this.deleteList}>
            <Text>제거</Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container
          visible={this.state.dialogVisible}
          onBackdropPress={this.onCancel}
        >
          <Dialog.Title>주문 번호 할당</Dialog.Title>
          <Dialog.Description>해당주문의 번호를 입력하세요</Dialog.Description>
          {Platform.OS === "ios" ? (
            <Dialog.Input
              value={userInfo.orderList[this.props.arrayIndex].data.number}
              onChange={data => this.handleDialog(data, this.props.arrayIndex)}
              keyboardType={"numeric"}
              color="black"
            />
          ) : (
            <Dialog.Input
              value={userInfo.orderList[this.props.arrayIndex].data.number}
              onChange={data => this.handleDialog(data, this.props.arrayIndex)}
              keyboardType={"numeric"}
            />
          )}
          <Dialog.Button label="취소" onPress={this.onCancel} />
          <Dialog.Button label="할당" onPress={() => this.handleOrderData()} />
        </Dialog.Container>
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
  userInf: {
    flexDirection: "column",
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
