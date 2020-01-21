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
import OrderBox from "../Components/OrderBox";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

class OrderListTab extends Component {
  constructor(props) {
    super(props);
    this.dataList = [];
    // this.state = { datas: datas }
    this.removeOrderBox = this.removeOrderBox.bind(this);

    // 초기화 시 데이터 가져오기
    this.getOrderData();
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ color: tintColor }} />
    )
  };

  // AsyncStorage를 이용한 데이터 가져오기
  getOrderData = async () => {
    let rawData = await AsyncStorage.getItem("orderData");
    const { userInfo } = this.props;

    let orderData = JSON.parse(rawData);

    userInfo.setOrderList(orderData);
  };

  state = {
    status: [1, 2, 3]
  };

  removeOrderBox = () => {
    this.setState((status = 3));
  };

  render() {
    //let dataList = this.getOrderData();
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ height: 30 }} />
          {/* {userInfo.notification &&
        userInfo.notification.data.target != "no data" ? (
          <OrderBox />
        ) : (
          <Text>현재 주문이 없습니다</Text>
        )} */}
          {userInfo.orderList.map((value, index) => {
            return this.state.status != 3 ? (
              <OrderBox
                arrayIndex={index}
                key={index}
                unMount={this.removeOrderBox}
              />
            ) : null;
          })}
          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default inject("userInfo")(observer(OrderListTab));
