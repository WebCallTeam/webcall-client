import { action, observable } from "mobx";

export default class Store {
  @observable name = "";
  @observable password = "";

  @action setName(name) {
    this.name = name;
  }

  @action setPassword(password) {
    this.password = password;
  }
}
