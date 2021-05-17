export default class WinScreen {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.continue = false;
  }

  render() {
    this.active = true;
    this.section = document.createElement('section');
    this.button = document.createElement('button');
    this.message = document.createElement('h2');

    this.section.id = 'win-screen';
    this.button.textContent = 'Next Map';
    this.message.textContent = 'You did it!';

    this.section.appendChild(this.message);
    this.section.appendChild(this.button);

    // event listener

    const handleClick = () => {
      this.continue = true;
      this.button.removeEventListener('click', handleClick);
    };

    this.button.addEventListener('click', handleClick);

    this.parent.appendChild(this.section);
  }
  remove() {
    this.active = false;
    this.continue = false;
    this.section.remove();
  }
}
