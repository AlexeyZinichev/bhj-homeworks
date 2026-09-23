// Находим элементы DOM
const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');

// Ключ, по которому данные будут лежать в Local Storage
const STORAGE_KEY = 'simpleTextEditor_v1';

// Функция сохранения текста в локальное хранилище
function saveToStorage() {
    const text = editor.value;
    localStorage.setItem(STORAGE_KEY, text);
}

// Функция восстановления текста из локального хранилища
function loadFromStorage() {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText !== null) {
        editor.value = savedText;
    }
}

// Функция обновления статуса сохранения
function updateStatus(saved = true) {
    status.textContent = saved ? 'Изменения сохранены' : 'Сохранение...';
    // Небольшая задержка, чтобы показать пользователю процесс "Сохранение..."
    setTimeout(() => {
        if (status.textContent === 'Сохранение...') {
            status.textContent = 'Изменения сохраняются автоматически';
        }
    }, 500);
}

// Функция полной очистки (UI + хранилище)
function clearAll() {
    editor.value = '';
    localStorage.removeItem(STORAGE_KEY);
    updateStatus(false); 
    // Фокус остается в поле, чтобы пользователь мог сразу начать печатать заново
    editor.focus();
}

// Восстановление данных при первичной загрузке страницы
loadFromStorage();

// Сохранение текста при любом изменении в поле ввода
editor.addEventListener('input', () => {
    saveToStorage();
    updateStatus(true);
});

// Очистка по нажатию кнопки
clearBtn.addEventListener('click', clearAll);

// Дополнительная надежность: сохранение перед закрытием вкладки
window.addEventListener('beforeunload', saveToStorage);
