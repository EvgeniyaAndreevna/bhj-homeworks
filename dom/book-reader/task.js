// Находим основной контейнер читалки
const book = document.getElementById('book');

// === 1. Управление размером шрифта ===
const fontControls = document.querySelectorAll('.font-size');

fontControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартный переход по ссылке

        // Снимаем активный класс у предыдущего элемента
        document.querySelector('.font-size_active').classList.remove('font-size_active');
        
        // Добавляем активный класс текущему (кликнутому) элементу
        control.classList.add('font-size_active');

        // Удаляем все классы размеров у книги, чтобы они не наслаивались друг на друга
        book.classList.remove('book_fs-small', 'book_fs-big');

        // Получаем значение размера из атрибута data-size и добавляем нужный класс
        const size = control.dataset.size;
        if (size) {
            book.classList.add(`book_fs-${size}`);
        }
    });
});

// === 2. Управление цветом текста и фона ===

// Создаем универсальную функцию-помощник, чтобы не дублировать код для текста и фона
function setupColorControls(selector, dataAttribute, prefix, classesToRemove) {
    const controls = document.querySelectorAll(`${selector} .color`);

    controls.forEach(control => {
        control.addEventListener('click', (event) => {
            event.preventDefault();

            // Переключаем класс color_active внутри конкретного блока управления
            document.querySelector(`${selector} .color_active`).classList.remove('color_active');
            control.classList.add('color_active');

            // Удаляем старые цветовые классы из книги (распыляем массив через оператор ...)
            book.classList.remove(...classesToRemove);

            // Получаем цвет из dataset (например, data-text-color -> dataset.textColor)
            const colorValue = control.dataset[dataAttribute];
            
            // Если значение есть, добавляем новый класс к книге
            if (colorValue) {
                book.classList.add(`${prefix}${colorValue}`);
            }
        });
    });
}

// Активируем управление цветом текста
setupColorControls(
    '.book__control_color',
    'textColor',            // читает data-text-color
    'book_color-',          // префикс для формирования класса
    ['book_color-black', 'book_color-gray', 'book_color-whitesmoke']
);

// Активируем управление цветом фона
setupColorControls(
    '.book__control_background',
    'bgColor',              // читает data-bg-color
    'book_bg-',
    ['book_bg-black', 'book_bg-gray', 'book_bg-white']
);