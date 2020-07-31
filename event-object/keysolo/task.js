'use strict';

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');

    this.reset();

    this.registerEvents();
    let idTimer = null;
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
     */
    this.activateTimer();

    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'Alt':
        case 'Shift':
        case 'Control': {
          break;
        }
        default: event.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase() ? this.success() : this.fail();
      }
    });
  }

  activateTimer() {
    if (this.idTimer) clearInterval(this.idTimer);
    let timerValue = this.timerElement.textContent;
    this.idTimer = setInterval(() => {
      this.timerElement.textContent = --timerValue;
      if (timerValue < 0) this.fail();
    }, 1000);
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.activateTimer();
  }

  fail() {
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
    this.activateTimer();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.timerElement.textContent = word.length;
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript',
      'Я люблю kitkat'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))
