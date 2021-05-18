export default class GameWrapper {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
  }
  render() {
    this.div = document.createElement('div');
    this.div.id = 'game-wrapper';
    this.parent.appendChild(this.div);
  }
  remove() {
    this.wrapper.remove();
  }
}
