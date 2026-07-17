// Находим все выпадающие списки на странице, чтобы поддержать независимую работу нескольких кнопок
const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

dropdowns.forEach(dropdown => {
    // Для каждого списка находим его основные элементы
    const valueElement = dropdown.querySelector('.dropdown__value');
    const listElement = dropdown.querySelector('.dropdown__list');
    const links = Array.from(dropdown.querySelectorAll('.dropdown__link'));

    // 1. Сворачивание/разворачивание списка по клику на кнопку
    valueElement.addEventListener('click', () => {
        // Метод toggle отлично подходит: если класса нет - добавляет, если есть - убирает
        listElement.classList.toggle('dropdown__list_active');
    });

    // 2. Замена значения и закрытие при выборе пункта меню
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            // Запрещаем переход по ссылке (стандартное поведение браузера)
            event.preventDefault(); 
            
            // Устанавливаем текст выбранной ссылки в главную кнопку
            // Метод trim() используется для удаления лишних пробелов и переносов строк из HTML
            valueElement.textContent = link.textContent.trim(); 
            
            // Закрываем выпадающий список
            listElement.classList.remove('dropdown__list_active');
        });
    });
});