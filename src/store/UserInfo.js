import { action, observable } from "mobx";

export default class UserInfo {
  @observable name = "";
  @observable password = "";
  @observable notification = {
    origin: "current nothing",
    data: { target: "no data" },
    remote: true
  };

  @observable orderList = [];

  @observable testText = "가입";

  @action setName(name) {
    this.name = name;
  }

  @action setPassword(password) {
    this.password = password;
  }

  @action setText(Text) {
    this.testText = Text;
  }

  @action setNotification(notification) {
    this.notification = notification;
  }

  @action setOrderList(notificationArray) {
    this.orderList = Array.from(notificationArray);
  }

  @action addNotification(notification) {
    this.orderList.push(notification);
  }

  @action deleteNotification(value) {
    this.orderList.splice(value, 1);
  }
}
