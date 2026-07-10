// 1. Получаем необходимые элементы из DOM
const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('clicker__counter');

// Получаем элемент для вывода скорости (убедитесь, что добавили его в HTML)
// Например: <div>Скорость клика: <span id="clicker__speed">0</span></div>
const speedElement = document.getElementById('clicker__speed');

// 2. Инициализируем переменные состояния
let clickCount = Number(counterElement.textContent);
let isEnlarged = false; // Флаг для отслеживания текущего размера

// Запоминаем время инициализации (или первого клика) для расчета скорости
let lastClickTime = new Date().getTime(); 

// 3. Вешаем обработчик события клика на печеньку
cookie.addEventListener('click', () => {
    // --- БАЗОВЫЙ УРОВЕНЬ ---
    
    // Увеличиваем счетчик кликов
    clickCount++;
    counterElement.textContent = clickCount;

    // Чередуем размер (ширину и высоту). 
    // Значения 200 и 250 взяты для примера, вы можете подставить свои из CSS/HTML
    if (isEnlarged) {
        cookie.width = 200; 
        cookie.height = 200; // Если нужно менять и высоту
        isEnlarged = false;
    } else {
        cookie.width = 250;
        cookie.height = 250;
        isEnlarged = true;
    }

    // --- ПОВЫШЕННЫЙ УРОВЕНЬ (Скорость клика) ---
    
    // Получаем текущее время в миллисекундах
    const currentTime = new Date().getTime();
    
    // Вычисляем разницу во времени в секундах (делим на 1000)
    const timeDiffSeconds = (currentTime - lastClickTime) / 1000;
    
    // Защита от деления на 0 (если клики произошли в одну и ту же миллисекунду)
    if (timeDiffSeconds > 0) {
        // Рассчитываем скорость (клики в секунду) и оставляем 2 знака после запятой
        const clickSpeed = (1 / timeDiffSeconds).toFixed(2);
        
        // Обновляем значение на странице
        if (speedElement) {
            speedElement.textContent = clickSpeed;
        }
    }
    
    // Обновляем время последнего клика для следующего расчета
    lastClickTime = currentTime;
});