document.addEventListener('DOMContentLoaded', function() {
  const book = document.getElementById('book');
  
  // Управление размером шрифта
  document.querySelectorAll('.font-size').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Снимаем активный класс со всех кнопок размера
      document.querySelectorAll('.font-size').forEach(btn => btn.classList.remove('font-size_active'));
      
      // Добавляем его на нажатую кнопку
      link.classList.add('font-size_active');
      
      // Удаляем все классы размеров у книги
      book.classList.remove('book_fs-small', 'book_fs-big');
      
      // Устанавливаем нужный класс в зависимости от атрибута data-size
      if (link.dataset.size === 'small') {
        book.classList.add('book_fs-small');
      } else if (link.dataset.size === 'big') {
        book.classList.add('book_fs-big');
      }
    });
  });

  // Управление цветом текста
  document.querySelectorAll('[data-text-color]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Снимаем активный класс со всех кнопок цвета текста
      document.querySelectorAll('[data-text-color]').forEach(btn => btn.classList.remove('color_active'));
      
      // Добавляем его на нажатую кнопку
      link.classList.add('color_active');
      
      // Удаляем старые классы цветов у книги
      book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
      
      // Устанавливаем новый цвет по значению из data-text-color
      book.classList.add(`book_color-${link.dataset.textColor}`);
    });
  });

  // Управление фоном
  document.querySelectorAll('[data-bg-color]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Снимаем активный класс со всех кнопок фона
      document.querySelectorAll('[data-bg-color]').forEach(btn => btn.classList.remove('color_active'));
      
      // Добавляем его на нажатую кнопку
      link.classList.add('color_active');
      
      // Удаляем старые классы фона у книги
      book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
      
      // Устанавливаем новый фон по значению из data-bg-color
      book.classList.add(`book_bg-${link.dataset.bgColor}`);
    });
  });
});
