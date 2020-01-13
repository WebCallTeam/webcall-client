import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Notifications } from "expo";

class MainScreen extends Component {
  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = async value => {
    const { userInfo } = this.props;

    this.props.navigation.navigate("OrderListTab");
  };
}

export default inject("userInfo")(observer(MainScreen));
