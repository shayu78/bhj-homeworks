'use strict';

// обязательное задание
const timerElement = document.getElementById('timer');
let timerValue = timerElement.textContent;
if (isFinite(timerValue) && (timerValue ^ 0) === parseFloat(timerValue) && timerValue > 0) {    // проверка на положительное целое число
    const idInterval = setInterval(() => {
        timerElement.textContent = --timerValue;
        if (timerValue === 0) {
            clearInterval(idInterval);
            setTimeout(() => alert('Вы победили в конкурсе!'), 0);
        }
    }, 1000);
}

// повышенный уровень сложности - задание #1, #2
setTimeout(() => {
    let countdown = 30;
    if (countdown > 0 && countdown <= 3600 * 24) {    // проверка на положительное число, в рамках одного дня
        const idInterval = setInterval(() => {
            let hours = parseInt((countdown % (3600 * 24)) / 3600, 10);
            let minutes = parseInt((countdown % 3600) / 60, 10)
            let seconds = parseInt(countdown % 60, 10);

            hours = hours < 10 ? `0${hours}` : hours;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            timerElement.textContent = `${hours}:${minutes}:${seconds}`;

            countdown--;
            if (countdown < 0) {
                clearInterval(idInterval);
                window.location.href = 'https://drive.google.com/file/d/1U71ybWBzWMz8ynRm6A1I-CN1JjdgG33b/view?usp=sharing';
            }
        }, 1000);
    } else setTimeout(() => alert('Счетчик времени обнулен или превышает одни сутки, операция прервана...'), 0);
}, timerValue * 1000);
