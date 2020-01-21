import { action, observable } from "mobx";

export default class UserInfo {
  @observable id = "";
  @observable name = "";
  @observable password = "";
  @observable token = null;
  @observable notification = {
    origin: "current nothing",
    data: { target: "no data" },
    remote: true
  };

  @observable orderList = [];

  @observable isAdmin = false;

  @action setId(id) {
    this.id = id;
  }

  @action setName(name) {
    this.name = name;
  }

  @action setPassword(password) {
    this.password = password;
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setNotification(notification) {
    this.notification = notification;
  }

  @action initNotification(notification) {
    this.notification = {
      origin: "current nothing",
      data: { target: "no data" },
      remote: true
    };
  }

  @action setOrderList(notificationArray) {
    this.orderList = Array.from(notificationArray);
  }

  @action setOrderNumber(data, index) {
    this.orderList[index].data.number = data;
  }

  @action addNotification(notification) {
    this.orderList.push(notification);
  }

  @action deleteNotification(value) {
    this.orderList.splice(value, 1);
  }

  @action toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }

  @action setAdmin(boolValue) {
    this.isAdmin = boolValue;
  }
}
