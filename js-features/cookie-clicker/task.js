let clicks = 0;
let lastClickTime = null;
const cookie = document.getElementById('cookie');
const counterEl = document.getElementById('clicker__counter');
// 🟢 Ищем именно по ID!
const speedEl = document.getElementById('speed');

function handleCookie() {
    const now = Date.now();

    // Условие №1 — увеличиваем счётчик при каждом клике
    clicks++;
    counterEl.textContent = clicks; // Только чтение/запись textContent

    // Условие №3 — параметр «Скорость клика»
    if (lastClickTime !== null) { 
        const timeDiffMs = now - lastClickTime;
        
        // Округляем до сотых
        const speed = Math.round((timeDiffMs / 1000) * 100) / 100;

        // 🔥 Вставляем только ЧИСЛО! Текст "клик/с" уже есть в HTML
        speedEl.textContent = `Скорость клика: ${speed}`; // Вот здесь должно быть полное предложение
    } else {
        speedEl.textContent = ''; // Очищаем поле на первом клике
    }

    // Запоминаем текущее время как последнее
    lastClickTime = now;

    // Условие №2 — чередуем уменьшение и увеличение печенюшки
    let currentSize = parseInt(cookie.width);
    
    cookie.setAttribute('width', currentSize === 200 ? '180' : '200');
}

// 🔥 Добавим стили прямо из JS, чтобы скорость была на новой строке
speedEl.style.display = 'block';

cookie.onclick = handleCookie;