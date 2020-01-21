import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
import OrderBox from "../Components/";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

class OrderListTab extends Component {
  constructor(props) {
    super(props);
    this.dataList = [];
    // this.state = { datas: datas }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ color: tintColor }} />
    )
  };

  // AsyncStorage를 이용한 데이터 가져오기
  getOrderData = () => {
    const orderData = AsyncStorage.getItem("orderData");

    let orderDataList = JSON.parse(orderData);
    if (!orderDataList) {
      orderDataList = [];
    }

    return orderDataList;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignContent: "center",
            alignSelf: "center",
            fontSize: 30
          }}
        >
          {userInfo.name}님의 주문
        </Text>
        {console.log(userInfo.name)}
      </View>
    );

    /* 
    //let dataList = this.getOrderData();
    return (
      <View style={styles.container}>
        <ScrollView nestedscrollEnabled={true}>
          {!userInfo.orderList.length && (
            <Text
              style={{
                alignContent: "center",
                alignSelf: "center",
                fontSize: 30
              }}
            >
              현재 주문이 없습니다
            </Text>
          )}
          {console.log(!userInfo.orderList.length)}
          {userInfo.orderList.map((value, index) => {
            <OrderBox value={value} key={index} />;
          })}
        </ScrollView>
      </View>
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 30
  }
});

export default inject("userInfo")(observer(OrderListTab));
