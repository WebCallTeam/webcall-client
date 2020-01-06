import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import OrderBox from "../Components/OrderBox";
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
    //let dataList = this.getOrderData();
    return (
      <View style={styles.container}>
        {/* {userInfo.notification &&
        userInfo.notification.data.target != "no data" ? (
          <OrderBox />
        ) : (
          <Text>현재 주문이 없습니다</Text>
        )} */}
        {userInfo.notificationList.map(index => {
          return <OrderBox index={index} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default inject("userInfo")(observer(OrderListTab));
