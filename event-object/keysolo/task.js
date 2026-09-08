class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = document.getElementById('timer');

    // Свойства для управления игрой
    this.currentWord = '';
    this.currentSymbolIndex = 0;
    this.timeLeft = 0;
    this.timerInterval = null;

    this.reset();
    this.registerEvents();
  }

  reset() {
    clearInterval(this.timerInterval);
    this.setNewWord();
    this.winsElement.textContent = '0';
    this.lossElement.textContent = '0';
  }

  registerEvents() {
    window.addEventListener('keyup', (event) => {
      // Если игра не запущена или слово закончилось — игнорируем нажатия
      if (!this.currentWord || !this.currentSymbol) return;
      
      const pressedKey = event.key; 

      // Игнорируем служебные клавиши (Shift, Ctrl, Alt, CapsLock и т.д.)
      if (pressedKey.length > 1 && pressedKey !== ' ') return;

      // Получаем ожидаемый символ из строки currentWord
      const expectedChar = this.currentWord[this.currentSymbolIndex];

      // Сравниваем символы без учета регистра
      if (pressedKey.toLowerCase() === expectedChar.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.remove('symbol_current');
    this.currentSymbol.classList.add('symbol_correct');

    this.currentSymbolIndex++;

    if (this.currentSymbolIndex < this.currentWord.length) {
      this.currentSymbol = this.wordElement.children[this.currentSymbolIndex];
      this.currentSymbol.classList.add('symbol_current');
    } else {
      // Слово введено полностью
      clearInterval(this.timerInterval);
      this.winsElement.textContent = parseInt(this.winsElement.textContent) + 1;
      if (parseInt(this.winsElement.textContent) >= 10) {
        alert('Победа!');
        this.reset();
      } else {
        this.setNewWord();
      }
    }
  }

  fail() {
    this.currentSymbol.classList.add('word_incorrect');
    clearInterval(this.timerInterval);
    this.lossElement.textContent = parseInt(this.lossElement.textContent) + 1;
    
    if (parseInt(this.lossElement.textContent) >= 5) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      setTimeout(() => this.setNewWord(), 500); // Даем пользователю увидеть ошибку перед сменой слова
    }
  }

  startTimer() {
    this.timeLeft = this.currentWord.length;
    this.timerElement.textContent = this.timeLeft;
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.timerElement.textContent = this.timeLeft;
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.fail();
      }
    }, 1000);
  }

  setNewWord() {
    clearInterval(this.timerInterval);
    this.currentWord = this.getWord();
    this.currentSymbolIndex = 0;
    
    // Сохраняем исходное слово в дата-атрибуте для точной сверки кодов при необходимости
    this.wordElement.dataset.word = this.currentWord;
    this.renderWord(this.currentWord);
    this.startTimer();
  }

  getWord() {
    const words = [
      'bob', 'awesome', 'netology', 'hello', 'kitty', 'rock', 'youtube', 
      'popcorn', 'cinema', 'love', 'javascript', 'я люблю kitkat', 'привет'
    ];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  renderWord(word) {
    // Используем innerHTML и оператор распространения [...], как требовалось в задаче
    const html = [...word].map((char, i) => {
      // Экранируем спецсимволы HTML, чтобы они отображались корректно
      const safeChar = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char;
      return `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${safeChar}</span>`;
    }).join('');
    
    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.firstElementChild;
  }

  get currentSymbol() {
    return this._currentSymbol;
  }

  set currentSymbol(element) {
    this._currentSymbol = element;
  }
}

new Game(document.getElementById('game'));
