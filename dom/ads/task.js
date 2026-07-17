// Находим все ротаторы на странице, чтобы поддерживать их множественное использование
const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  // Находим начальный активный элемент внутри конкретного ротатора
  let activeCase = rotator.querySelector('.rotator__case_active');
  
  // Устанавливаем цвет для первого элемента при загрузке, если он задан
  if (activeCase && activeCase.dataset.color) {
    activeCase.style.color = activeCase.dataset.color;
  }

  // Функция для смены текстовых блоков
  function changeCase() {
    // Получаем скорость текущего элемента (по умолчанию 1000мс, если атрибут не задан)
    const speed = parseInt(activeCase.dataset.speed, 10) || 1000;

    // Планируем смену класса через заданное время
    setTimeout(() => {
      // Убираем активный класс у текущего элемента
      activeCase.classList.remove('rotator__case_active');
      
      // Переходим к следующему элементу
      activeCase = activeCase.nextElementSibling;
      
      // Если следующего элемента нет (конец списка), возвращаемся к первому
      if (!activeCase) {
        activeCase = rotator.firstElementChild;
      }
      
      // Добавляем активный класс новому элементу
      activeCase.classList.add('rotator__case_active');
      
      // Применяем цвет из data-color, если он существует
      if (activeCase.dataset.color) {
        activeCase.style.color = activeCase.dataset.color;
      }

      // Запускаем функцию снова для организации бесконечного цикла
      changeCase();
    }, speed);
  }

  // Запускаем цикл для текущего ротатора
  if (activeCase) {
    changeCase();
  }
});