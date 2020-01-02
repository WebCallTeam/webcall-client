import { action, observable } from "mobx";
import { inject } from "mobx-react";

export default class OrderInfo {
  @observable name = "";
  @observable orderNumber = "00";

  @action setName(name) {
    this.name = name;
  }

  @action setOrderNumber(number) {
    this.number = number;
  }
}
