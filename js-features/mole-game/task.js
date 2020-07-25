'use strict';

let missCounter = 0;
let killCounter = 0;

const deadCounterElement = document.getElementById('dead');
const lostCounterElement = document.getElementById('lost');

const getHole = index => document.getElementById(`hole${index}`);

const clearStatistic = () => {
    missCounter = 0;
    killCounter = 0;
    deadCounterElement.textContent = killCounter;
    lostCounterElement.textContent = missCounter;
}

for (let i = 1; i < 10; i++) {
    getHole(i).onclick = (event) => {
        if (event.target.className.includes('hole_has-mole')) deadCounterElement.textContent = ++killCounter;
        else lostCounterElement.textContent = ++missCounter;
        if (killCounter === 10) {
            setTimeout(() => {
                alert('Победа!');
                clearStatistic();
                return;
            }, 0);
        } else if (missCounter === 5) {
            setTimeout(() => {
                alert('Вы проиграли!');
                clearStatistic();
            }, 0);
        }
    };
}
