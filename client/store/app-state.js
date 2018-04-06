import { observable, computed, action } from 'mobx';

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'Eric' }) {
    this.count = count;
    this.name = name;
  }
  @observable count;
  @observable name;
  @computed get msg() {
    return `${this.name} said the count is ${this.count}`;
  }
  @action add() {
    this.count += 1;
  }
  toJson() {
    return {
      name: this.name,
      count: this.count,
    };
  }
}
