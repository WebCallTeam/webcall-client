import { action, observable } from "mobx";

export default class UserInfo {
  @observable name = "";
  @observable password = "";
  @observable notification = {
    origin: "current nothing",
    data: { target: "no data" },
    remote: true
  };

  @observable notificationList = [];

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

  @action setNotificationList(notificationArray) {
    this.notificationList = Array.from(notificationArray);
  }

  @action addNotification(notification) {
    this.notificationList.push(notification);
  }

  @action deleteNotification(value) {
    this.notificationList.splice(value, 1);
  }
}
