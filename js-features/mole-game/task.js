(() => {
  let playing = true,
    activeHole = 1,
    dead = 0,
    lost = 0;

  const stop = () => playing = false;

  // Функция получения элемента лунки по индексу
  const getHole = index => document.getElementById(`hole${index}`);
  
  // Обновление статистики на экране
  const updateStats = () => {
    document.querySelector('#dead').textContent = dead;
    document.querySelector('#lost').textContent = lost;
  };

  // Деактивация текущей лунки
  const deactivateHole = index =>
    getHole(index).className = 'hole';

  // Активация новой лунки
  const activateHole = index =>
    getHole(index).className = 'hole hole_has-mole';

  // Генерация следующего появления крота
  const next = () => setTimeout(() => {
      if (!playing) return;
      
      deactivateHole(activeHole);
      activeHole = Math.floor(1 + Math.random() * 9); // случайная лунка от 1 до 9
      activateHole(activeHole);
      next();
  }, 800);

  // Регистрация обработчиков для всех лунок
  for(let i = 1; i <= 9; i++) {
    getHole(i).onclick = function() {
      if(!playing) return; // если игра остановлена, ничего не делаем

      // Проверяем, был ли клик по активному кроту
      if(this.classList.contains('hole_has-mole')) { // или this.className.includes('hole_has-mole')
        dead++;
        
        // Победа!
        if(dead >= 10) {
          alert('Вы выиграли! Поздравляем!');
          stop(); // остановка игры
          dead = 0;
          lost = 0;
          updateStats();
        }
      } else {
        lost++;
        
        // Поражение :(
        if(lost >= 5) {
          alert('Кроты вас одолели... Игра окончена.');
          stop(); // остановка игры
          dead = 0;
          lost = 0;
          updateStats();
        }
      }

      // В любом случае обновим статистику
      updateStats();
    };
  }

  next(); // запускаем первую итерацию
})();