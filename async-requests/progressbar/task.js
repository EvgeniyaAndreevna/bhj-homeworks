const progress = document.getElementById('progress');
const form = document.getElementById('form'); // Предполагается, что у формы есть id="form"

form.addEventListener('submit', (event) => {
    // 1. Отменяем стандартную отправку формы с перезагрузкой страницы
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    // Создаем объект FormData, который автоматически соберет все данные из формы, включая файл
    const formData = new FormData(form);

    // 2. Обработчик события изменения процесса загрузки
    // Важно: событие вешается именно на xhr.upload, так как мы отслеживаем отправку
    xhr.upload.addEventListener('progress', (e) => {
        // Проверяем, можно ли вычислить общий размер отправляемых данных
        if (e.lengthComputable) {
            // e.loaded - сколько байт отправлено
            // e.total - общий размер отправляемых данных
            // Получаем значение от 0.0 до 1.0 для тега <progress>
            const progressValue = e.loaded / e.total;
            progress.value = progressValue;
        }
    });

    // Опционально: можно отследить успешное завершение
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Успешная загрузка!');
            // Здесь можно, например, показать пользователю сообщение об успехе
        } else {
            console.error('Произошла ошибка при загрузке. Статус:', xhr.status);
        }
    });

    // 3. Настраиваем запрос и отправляем данные
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});