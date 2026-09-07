document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки (родительские элементы)
    const dropdowns = document.querySelectorAll('.dropdown');

    // Обрабатываем каждую кнопку отдельно
    dropdowns.forEach(dropdown => {
        // Элементы управления конкретной кнопки
        const valueEl = dropdown.querySelector('.dropdown__value'); // текущее значение
        const listEl = dropdown.querySelector('.dropdown__list');   // выпадающий список

        // Открываем/закрываем список при нажатии на текущую кнопку
        valueEl.addEventListener('click', () => {
            listEl.classList.toggle('dropdown__list_active');
        });

        // Закрываем список и меняем текст при выборе любого пункта
        // Вешаем обработчик на сам список, а не на каждый <li>
        listEl.addEventListener('click', event => {
            // Используем closest(), чтобы проверить, по какому пункту нажали
            const item = event.target.closest('.dropdown__item');
            
            if (!item) return; // Нажатие было мимо пункта — ничего не делаем

            // Запрещаем переход по ссылке
            event.preventDefault();

            // Берём текст из ссылки внутри выбранного пункта
            const newValue = item.querySelector('.dropdown__link').textContent;

            // Меняем отображаемое значение
            valueEl.textContent = newValue;

            // Закрываем список
            listEl.classList.remove('dropdown__list_active');
        });
    });
});