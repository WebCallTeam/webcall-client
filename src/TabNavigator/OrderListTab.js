import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import OrderBox from "../Components/OrderBox";
import { inject, observer } from "mobx-react";
import { userInfo } from "../store";

class OrderListTab extends Component {
  constructor(props) {
    super(props);
    // this.state = { datas: datas };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ color: tintColor }} />
    )
  };

  checkOrder() {
    const { userInfo } = this.props;

    return userInfo.notification &&
      userInfo.notification.data.target != "no data" ? (
      <OrderBox />
    ) : (
      <Text>현재 주문이 없습니다</Text>
    );
  }

  render() {
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
