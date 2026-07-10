// Находим элемент таймера на странице
const timerElement = document.getElementById("timer");

// Читаем стартовое значение в секундах
let secondsLeft = Number(timerElement.textContent);

// Функция для преобразования секунд в формат hh:mm:ss
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Сразу форматируем стартовое значение на странице до запуска интервала
timerElement.textContent = formatTime(secondsLeft);

// Запускаем ежесекундный интервал
const timerId = setInterval(() => {
    secondsLeft -= 1;
    
    // Обновляем текст элемента, используя функцию форматирования
    timerElement.textContent = formatTime(secondsLeft);
    
    // Проверяем условие окончания отсчета
    if (secondsLeft <= 0) {
        clearInterval(timerId); // Обязательно останавливаем таймер
        
        alert("Вы победили в конкурсе!"); 
        
        // --- Логика скачивания файла ---
        const downloadLink = document.createElement('a');
        // Ссылка на файл (можно заменить на любую другую)
        downloadLink.href = 'https://raw.githubusercontent.com/netology-code/bhj-homeworks/master/js-features/countdown/demo.gif';
        downloadLink.download = 'prize.gif'; 
        downloadLink.target = '_blank';
        downloadLink.click();
    }
}, 1000);