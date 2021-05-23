export default class WinScreen {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.continue = false;
  }

  render(score) {
    this.active = true;
    this.section = document.createElement('section');
    this.flexDiv = document.createElement('div');
    this.flexDiv.classList.add('winscreen-flex-container');
    this.message = document.createElement('h2');
    this.score = document.createElement('p');
    this.button = document.createElement('button');

    this.section.id = 'win-screen';
    this.button.textContent = 'Next Map';
    this.message.textContent = 'You did it!';
    this.score.textContent = `Total strikes: ${score}`;

    this.flexDiv.appendChild(this.message);
    this.flexDiv.appendChild(this.score);
    this.section.appendChild(this.flexDiv);
    this.section.appendChild(this.button);

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
