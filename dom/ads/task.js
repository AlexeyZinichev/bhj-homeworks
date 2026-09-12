document.addEventListener('DOMContentLoaded', () => {
    // Находим все независимые блоки-ротаторы на странице
    const rotators = document.querySelectorAll('.rotator');

    // Проходимся по каждому из них
    rotators.forEach(rotatorEl => {
        // Собираем только те элементы внутри этого блока, которые являются слайдами
        const slides = Array.from(rotatorEl.querySelectorAll('.rotator__case'));
        
        if (!slides.length) return;

        let currentIndex = 0;

        // Функция смены слайда
        function nextSlide() {
            // 1. Скрываем текущий слайд
            slides[currentIndex].classList.remove('rotator__case_active');

            // 2. Вычисляем индекс следующего элемента (бесконечный цикл через остаток от деления)
            currentIndex = (currentIndex + 1) % slides.length;

            const activeSlide = slides[currentIndex];

            // 3. Показываем новый слайд
            activeSlide.classList.add('rotator__case_active');

            // 4. Читаем новые параметры скорости и цвета из data-атрибутов активного слайда
            const speed = parseInt(activeSlide.dataset.speed, 10) || 1000;
            const color = activeSlide.dataset.color;

            // 5. Меняем цвет текста у всего контейнера .rotator
            // Это сработает, так как активный span внутри него имеет display: inline
            if (color) {
                rotatorEl.style.color = color;
            } else {
                // Если data-color не задан, сбрасываем стиль, чтобы вернуть стандартный цвет браузера/страницы
                rotatorEl.style.color = '';
            }

            // 6. Перезапускаем таймер с новой скоростью
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, speed);
        }

        // Устанавливаем начальный цвет для самого первого слайда сразу после загрузки страницы
        const firstActive = slides.find(slide => slide.classList.contains('rotator__case_active'));
        if (firstActive && firstActive.dataset.color) {
            rotatorEl.style.color = firstActive.dataset.color;
        }

        // Запускаем первый интервал. 
        // Скорость берем у того слайда, который уже помечен активным в HTML.
        const initialSpeed = parseInt(slides[currentIndex].dataset.speed, 10) || 1000;
        let intervalId = setInterval(nextSlide, initialSpeed);
    });
});