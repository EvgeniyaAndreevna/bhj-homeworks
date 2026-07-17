// Находим все виджеты с вкладками на странице, 
// чтобы они могли работать независимо друг от друга
const tabWidgets = document.querySelectorAll('.tabs');

tabWidgets.forEach(widget => {
    // Для каждого виджета создаем массивы из вкладок и их содержимого
    const tabs = Array.from(widget.querySelectorAll('.tab'));
    const contents = Array.from(widget.querySelectorAll('.tab__content'));

    // Перебираем все вкладки текущего виджета и вешаем обработчик клика
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Получаем индекс кликнутой вкладки в массиве (как подсказывает задание)
            const index = tabs.indexOf(tab);

            // 2. Деактивируем все вкладки и скрываем все тексты в текущем виджете
            tabs.forEach(t => t.classList.remove('tab_active'));
            contents.forEach(c => c.classList.remove('tab__content_active'));

            // 3. Активируем нужную вкладку и показываем связанный с ней контент по индексу
            tab.classList.add('tab_active');
            contents[index].classList.add('tab__content_active');
        });
    });
});