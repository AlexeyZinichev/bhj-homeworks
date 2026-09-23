document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signin__form');
    const btnSignIn = document.getElementById('signin__btn');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const errorMessage = document.getElementById('signin__error');
    const loginInput = form.querySelector('[name="login"]');
    const passwordInput = form.querySelector('[name="password"]');
    const logoutBtn = document.getElementById('logout_btn');

    // Функция показа формы входа
    function showLogin() {
        document.getElementById('signin').classList.add('signin_active');
        welcomeBlock.classList.remove('welcome_active');
    }

    // Функция показа приветствия
    function showWelcome(id) {
        document.getElementById('signin').classList.remove('signin_active');
        welcomeBlock.classList.add('welcome_active');
        userIdSpan.textContent = id;
    }

    // Проверка локального хранилища при загрузке страницы
    const savedUserId = localStorage.getItem('user_id');
    if (savedUserId) {
        showWelcome(savedUserId);
    }

    // Обработчик отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Сбрасываем прошлые ошибки
        errorMessage.textContent = '';
        btnSignIn.disabled = true;
        btnSignIn.textContent = 'Отправка...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form) // Используем FormData согласно подсказке
            });

            const result = await response.json();

            if (result.success) {
                // Успешный вход
                localStorage.setItem('user_id', result.user_id);
                showWelcome(result.user_id);
            } else {
                // Ошибка авторизации
                errorMessage.textContent = 'Неверный логин/пароль';
            }
        } catch (err) {
            console.error(err);
            errorMessage.textContent = 'Ошибка сети или сервера.';
        } finally {
            // Очищаем поля формы после любой попытки
            form.reset();
            btnSignIn.disabled = false;
            btnSignIn.textContent = 'Войти';
        }
    });

    // Деавторизация
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        showLogin();
    });
});
