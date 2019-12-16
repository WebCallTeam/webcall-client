import { action, observable } from "mobx";

export default class UserInfo {
  @observable name = "";
  @observable password = "";

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
}
