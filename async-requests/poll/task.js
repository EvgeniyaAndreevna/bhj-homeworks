const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// 1. Инициализируем и отправляем GET-запрос для получения опроса
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.responseType = 'json'; // Автоматический парсинг JSON-ответа
xhr.send();

xhr.onload = function() {
  if (xhr.status >= 400) {
    console.error('Ошибка при загрузке опроса');
    return;
  }

  const pollData = xhr.response;
  const pollId = pollData.id;
  const title = pollData.data.title;
  const answers = pollData.data.answers;

  // Выводим заголовок опроса
  pollTitle.textContent = title;

  // Очищаем контейнер перед добавлением новых ответов
  pollAnswers.innerHTML = '';

  // 2. Генерируем кнопки для каждого варианта ответа
  answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('poll__answer');
    button.textContent = answer;

    // 3. Обработка клика по ответу
    button.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');

      // Повышенный уровень: Отправка голоса на сервер
      const xhrPost = new XMLHttpRequest();
      xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
      xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhrPost.responseType = 'json';
      
      // Отправляем ID опроса и индекс выбранного ответа
      xhrPost.send(`vote=${pollId}&answer=${index}`);

      xhrPost.onload = function() {
        if (xhrPost.status >= 400) {
          console.error('Ошибка при отправке голоса');
          return;
        }

        const statData = xhrPost.response.stat;
        
        // Считаем общее количество голосов для вычисления процентов
        const totalVotes = statData.reduce((acc, curr) => acc + curr.votes, 0);

        // Очищаем блок с кнопками
        pollAnswers.innerHTML = '';

        // 4. Отрисовка результатов статистики
        statData.forEach(statItem => {
          // Защита от деления на ноль, если голосов нет
          const percent = totalVotes === 0 ? 0 : ((statItem.votes / totalVotes) * 100).toFixed(2);
          
          const statBlock = document.createElement('div');
          // Используем inline-стили или просто текстовый вывод (по желанию можно добавить класс)
          statBlock.style.marginBottom = '10px';
          statBlock.innerHTML = `<strong>${statItem.answer}:</strong> <span>${percent}%</span>`;
          
          pollAnswers.appendChild(statBlock);
        });
      };
    });

    pollAnswers.appendChild(button);
  });
};