'use strict';

// обязательное задание и задание повышенной сложности
let counter = 0;
let previousDate = Date.now();

const cookieImage = document.getElementById('cookie');
const clickerCountElement = document.getElementById('clicker__counter');
const clickerSpeedElement = document.getElementById('clicker__speed');

cookieImage.onclick = () => {
    clickerCountElement.textContent = ++counter;
    cookieImage.width = (counter % 2 === 0) ? cookieImage.width -= 10 : cookieImage.width += 10;
    const currentDate = Date.now();
    let elapsedTime = currentDate - previousDate;
    previousDate = currentDate;
    clickerSpeedElement.textContent = 1 / elapsedTime * 1000;
};
