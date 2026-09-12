// 1. Читаем данные о текущем количестве секунд из DOM (пункт 1 задания)
const timerElement = document.getElementById('timer');
let totalSeconds = parseInt(timerElement.textContent, 10);

// Если по какой-то причине элемент пустой или содержит некорректные данные,
// задаем значение вручную (например, на 3 часа для наглядности формата hh:mm:ss)
if (isNaN(totalSeconds) || totalSeconds <= 0) {
    totalSeconds = 3 * 3600; // 3 часа
}

// Сохраняем стартовое значение
const startValue = totalSeconds;

// Функция для перевода секунд в строку формата "hh:mm:ss"
function formatHHMMSS(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    // padStart(2, '0') добавляет ноль спереди, если число меньше 10
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Устанавливаем начальное отображение сразу после загрузки скрипта
timerElement.textContent = formatHHMMSS(totalSeconds);

// Невидимая ссылка для скачивания файла (добавляется один раз при старте скрипта)
let downloadLinkCreated = false;
function getDownloadLink() {
    if (!downloadLinkCreated) {
        const link = document.createElement('a');
        link.id = 'downloadLink';
        link.download = '';
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        downloadLinkCreated = true;
    }
    return document.getElementById('downloadLink');
}

// 2. Каждую секунду уменьшаем значение таймера на 1 (пункт 2 задания)
const countdownInterval = setInterval(() => {
    totalSeconds--;

    // Обновляем текст внутри единственного span (реализация hh:mm:ss без смены HTML)
    timerElement.textContent = formatHHMMSS(totalSeconds);

    // 3. По окончании отсчёта выполняем условия (пункт 3 задания)
    if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        
        // Выводим сообщение alert()
        alert('Вы победили в конкурсе!');

        // Запускаем загрузку произвольного файла через объект window.location 
        // или программный клик по ссылке (BOM)
        
        // Вариант А: Программный клик по невидимой ссылке <a> (наиболее надежный способ)
        const link = getDownloadLink();
        // Замените URL ниже на адрес реального файла (лучше использовать бинарный тип: zip, bin, exe)
        const fileUrl = 'https://example.com/files/sample-file.bin'; 
        link.href = fileUrl;
        link.click();

        /* 
           Вариант Б: Прямое перенаправление через BOM (window.location).
           Работает только если сервер настроен отдавать файл как вложение 
           (заголовок Content-Disposition: attachment). Иначе браузер просто откроет его.
           
           window.location.href = fileUrl;
        */
    }
}, 1000);