// 1. Находим все корневые блоки с вкладками на странице.
const tabsWrappers = document.querySelectorAll('.tabs');

// 2. Проходимся по каждому найденному блоку и инициализируем его.
tabsWrappers.forEach(wrapper => {
    // Находим элементы только ВНУТРИ текущего блока wrapper
    const tabNavigation = wrapper.querySelector('.tab__navigation');
    const tabs = wrapper.querySelectorAll('.tab');
    const contents = wrapper.querySelectorAll('.tab__content');

    // Проверяем, что элементы найдены, чтобы избежать ошибок в пустых блоках
    if (!tabNavigation || !tabs.length || !contents.length) return;

    // 3. Регистрируем один обработчик события клика на родителе навигации (делегирование).
    tabNavigation.addEventListener('click', (event) => {
        // Ищем ближайший элемент с классом .tab вверх по дереву от места клика.
        const clickedTab = event.target.closest('.tab');

        // Если кликнули не по таб-переключателю (а по пустому месту внутри navigation), ничего не делаем.
        if (!clickedTab) return;

        // Находим индекс нажатой вкладки среди всех вкладок К ЭТОГО БЛОКА
        const index = Array.prototype.indexOf.call(tabs, clickedTab);

        // Индекс должен быть валидным (не -1). Это дополнительная страховка.
        if (index === -1) return;

        // 4. Удаляем активные классы у всех элементов ТЕКУЩЕГО блока
        tabs.forEach(tab => tab.classList.remove('tab_active'));
        contents.forEach(content => content.classList.remove('tab__content_active'));

        // 5. Добавляем активные классы элементам под найденным индексом
        tabs[index].classList.add('tab_active');
        contents[index].classList.add('tab__content_active');
    });
});
