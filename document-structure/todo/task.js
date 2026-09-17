document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tasks__form');
    const input = document.getElementById('task__input');
    const list = document.getElementById('tasks__list');

    // 1. Загрузка задач из localStorage при открытии страницы
    loadTasks();

    // 2. Обработчик формы (кнопка "Добавить" и клавиша Enter)
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Отменяем стандартное поведение формы
        
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
            saveTasks();
        }
    });

    /**
     * Функция создания и добавления новой задачи в DOM
     * @param {string} text - Текст задачи
     */
    function addTask(text) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'task__title';
        titleDiv.textContent = text;

        const removeLink = document.createElement('a');
        removeLink.href = '#';
        removeLink.className = 'task__remove';
        removeLink.innerHTML = '&times;';

        // ВАЖНО: Один обработчик добавляется непосредственно на создаваемый элемент
        removeLink.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });

        taskItem.appendChild(titleDiv);
        taskItem.appendChild(removeLink);
        list.appendChild(taskItem);
    }

    /**
     * Сохранение текущего списка задач в localStorage
     */
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#tasks__list .task').forEach(task => {
            const title = task.querySelector('.task__title').textContent;
            tasks.push(title);
        });
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    /**
     * Загрузка задач из localStorage и отрисовка их на странице
     */
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('myTasks'));
        if (Array.isArray(savedTasks)) {
            savedTasks.forEach(taskText => {
                addTask(taskText);
            });
        }
    }
});