export default class WinScreen {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.continue = false;
  }

  render(score, end) {
    this.active = true;
    this.section = document.createElement('section');
    this.flexDiv = document.createElement('div');
    this.flexDiv.classList.add('winscreen-flex-container');
    this.message = document.createElement('h2');
    this.score = document.createElement('p');
    this.button = document.createElement('button');
    this.button.classList.add('ball');

    this.section.id = 'win-screen';

    if (!end) {
      this.button.textContent = 'Next Map';
      this.message.textContent = 'You did it!';
    } else {
      this.button.textContent = 'Start over';
      this.message.textContent = 'You completed the game!';
    }

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
