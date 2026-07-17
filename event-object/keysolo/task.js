class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    // Используем стрелочную функцию, чтобы сохранить контекст this на объект Game
    document.addEventListener('keyup', (event) => {
      // Игнорируем нажатия непечатных/служебных клавиш (Shift, Ctrl, Alt, Enter и т.д.)
      if (event.key.length > 1) {
        return;
      }

      // Приводим оба символа к нижнему регистру для независимости от CapsLock и Shift
      const expectedSymbol = this.currentSymbol.textContent.toLowerCase();
      const actualSymbol = event.key.toLowerCase();

      // Сравниваем символы и вызываем соответствующий метод
      if (expectedSymbol === actualSymbol) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    // Исправлено с 5 на 3 согласно условиям задачи ("После 3 поражений игра заканчивается")
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
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
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));

