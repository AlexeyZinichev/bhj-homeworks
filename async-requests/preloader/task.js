document.addEventListener('DOMContentLoaded', () => {
  const CACHE_TTL_MS = 3600000; // 1 час жизни кэша
  const itemsContainer = document.getElementById('items');
  const loader = document.getElementById('loader');

  async function loadCurrencies() {
    let cachedData = null;

    try {
      const cacheString = localStorage.getItem('exchangeRatesCache');
      if (cacheString) {
        const { timestamp, data } = JSON.parse(cacheString);
        if ((Date.now() - timestamp) <= CACHE_TTL_MS) {
          cachedData = data;
        }
      }
    } catch {}

    if (cachedData) renderCurrencies(cachedData); // сразу показываем старые данные

    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
      const serverData = await response.json();

      localStorage.setItem(
        'exchangeRatesCache',
        JSON.stringify({
          timestamp: Date.now(),
          data: serverData,
        })
      );

      renderCurrencies(serverData);
    } catch (error) {
      console.error('Ошибка при получении данных:', error.message);
      if (!cachedData) alert('Не удалось получить актуальные курсы валют.');
    }
  }

  function renderCurrencies(data) {
    if (!data.response?.Valute) return;

    // Сначала скроем загрузчик, чтобы он не "подмигивал" при быстром рендере старых данных
    loader.classList.remove('loader_active');

    itemsContainer.innerHTML = ''; // очищаем список

    for (const [_, currency] of Object.entries(data.response.Valute)) {
      // Создаём элемент по твоему шаблону
      const itemHtml = `
        <div class="item">
          <div class="item__code">${currency.CharCode}</div>
          <div class="item__value">${Math.round(currency.Value * 100) / 100}</div>
          <div class="item__currency">руб.</div>
        </div>
      `;
      itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    }
  }

  loadCurrencies();
});
