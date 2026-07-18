const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// Выносим логику отрисовки валют в отдельную функцию, 
// чтобы не дублировать код для кэша и для новых данных
function renderCourses(valutes) {
    itemsContainer.innerHTML = ''; // Очищаем контейнер перед обновлением
    
    for (let key in valutes) {
        const valute = valutes[key];
        
        // Создаем обертку для каждого элемента
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        
        // Вставляем HTML-шаблон с нужными данными
        itemElement.innerHTML = `
            <div class="item__code">
                ${valute.CharCode}
            </div>
            <div class="item__value">
                ${valute.Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        `;
        
        itemsContainer.appendChild(itemElement);
    }
}

// ПОВЫШЕННЫЙ УРОВЕНЬ: Проверяем наличие сохраненных данных в localStorage
const cachedData = localStorage.getItem('currencyCourses');
if (cachedData) {
    // Если данные есть, парсим JSON и сразу отрисовываем их на странице
    renderCourses(JSON.parse(cachedData));
}

// Отправляем GET-запрос с помощью Fetch API для получения актуальных курсов
fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети при загрузке данных');
        }
        return response.json();
    })
    .then(data => {
        const valutes = data.response.Valute;
        
        // Отрисовываем свежие данные со страницы (они заменят кэшированные)
        renderCourses(valutes);
        
        // Кэшируем свежие данные в localStorage для следующих посещений
        localStorage.setItem('currencyCourses', JSON.stringify(valutes));
    })
    .catch(error => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        // По факту завершения загрузки (неважно, успешно или с ошибкой) скрываем лоадер
        loader.classList.remove('loader_active');
    });