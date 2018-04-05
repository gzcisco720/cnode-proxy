import { observable, computed, action } from 'mobx';

export class AppState {
  @observable count = 0;
  @observable name = 'Eric';
  @computed get msg() {
    return `${this.name} said the count is ${this.count}`;
  }
  @action add() {
    this.count += 1;
  }
}

const appState = new AppState();

export default appState;
