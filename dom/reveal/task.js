// Находим все элементы с классом reveal
const reveals = document.querySelectorAll('.reveal');

// Функция проверки видимости элемента
function checkVisibility() {
  reveals.forEach(reveal => {
    // Получаем координаты элемента относительно окна просмотра
    const { top, bottom } = reveal.getBoundingClientRect();
    
    // Проверяем, находится ли элемент в поле зрения
    // top < window.innerHeight - верхняя граница элемента появилась снизу экрана
    // bottom > 0 - нижняя граница элемента еще не скрылась за верхней частью экрана
    if (top < window.innerHeight && bottom > 0) {
      reveal.classList.add('reveal_active');
    } else {
      // Опционально: убираем класс, если элемент уходит из поля зрения, 
      // чтобы анимация повторялась при прокрутке вверх-вниз
      reveal.classList.remove('reveal_active');
    }
  });
}

// Отслеживаем событие прокрутки
window.addEventListener('scroll', checkVisibility);

// Запускаем проверку один раз при загрузке страницы, 
// чтобы показать элементы, которые уже находятся в зоне видимости
checkVisibility();