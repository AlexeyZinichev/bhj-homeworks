document.addEventListener('DOMContentLoaded', () => {
    // Превращаем NodeList в массив, чтобы иметь доступ к методам массива (например, filter)
    const revealElements = Array.from(document.querySelectorAll('.reveal'));

    function checkReveal() {
        // Оставляем в массиве только те элементы, у которых еще НЕТ класса reveal_active
        const elementsToCheck = revealElements.filter(el => !el.classList.contains('reveal_active'));
        
        // Если все элементы уже активны, отключаем слушатель для экономии ресурсов
        if (elementsToCheck.length === 0) {
            window.removeEventListener('scroll', checkReveal);
            return;
        }

        elementsToCheck.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // Проверка: верхняя граница блока пересекла нижнюю границу экрана
            if (rect.top < window.innerHeight) {
                element.classList.add('reveal_active');
                
                /* 
                  ВАЖНО: Мы НЕ удаляем слушатель scroll здесь! 
                  Он останется висеть на окне до тех пор, пока ВСЕ элементы не получат свой класс.
                  После активации текущего элемента он просто перестанет попадать в массив elementsToCheck 
                  благодаря фильтру .filter() выше.
                */
            }
        });
    }

    // Запускаем проверку один раз при загрузке. 
    // Это нужно на случай, если пользователь открыл страницу сразу якорным скроллом 
    // и некоторые блоки уже находятся в зоне видимости.
    checkReveal(); 

    window.addEventListener('scroll', checkReveal);
});
