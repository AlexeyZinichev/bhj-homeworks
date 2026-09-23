document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const closeButtons = document.querySelectorAll('[data-action="close-modal"]');

    // Функция для установки куки
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Функция для получения значения конкретной куки
    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}$$$$$$\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Проверяем состояние при загрузке страницы
    if (!getCookie('modalClosed')) {
        // Куки о закрытии нет — показываем окно
        modal.classList.add('modal_active');
    }

    // Обработчик закрытия окна
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс (скрываем окно)
            modal.classList.remove('modal_active');
            
            // Устанавливаем куку. Срок жизни — 365 дней.
            // Путь "/" делает куку доступной на всем сайте.
            setCookie('modalClosed', 'true', 365);
        });
    });
});
