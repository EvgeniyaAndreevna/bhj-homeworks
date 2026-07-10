// Получаем элементы счетчиков из DOM
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Инициализируем переменные состояния
let dead = Number(deadCounter.textContent);
let lost = Number(lostCounter.textContent);

// Функция для получения элемента лунки по ее индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Функция для обнуления статистики после окончания игры
function resetStats() {
    dead = 0;
    lost = 0;
    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
}

// Регистрируем обработчики событий для всех 9 лунок с помощью цикла
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    
    // Назначаем обработчик клика на каждую лунку
    hole.onclick = function() {
        // Проверяем наличие класса, указывающего на крота
        if (hole.classList.contains('hole_has-mole')) {
            dead += 1;
            deadCounter.textContent = dead;
        } else {
            lost += 1;
            lostCounter.textContent = lost;
        }

        // Проверяем условия победы и поражения
        if (dead === 10) {
            alert('Победа! Вы убили 10 кротов!');
            resetStats();
        } else if (lost === 5) {
            alert('Вы проиграли! Слишком много промахов.');
            resetStats();
        }
    }
}