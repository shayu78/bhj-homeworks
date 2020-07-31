'use strict';

let missCounter = 0;
let killCounter = 0;

const deadCounterElement = document.getElementById('dead');
const lostCounterElement = document.getElementById('lost');

// const getHole = index => document.getElementById(`hole${index}`);

const clearStatistic = () => {
    missCounter = 0;
    killCounter = 0;
    deadCounterElement.textContent = killCounter;
    lostCounterElement.textContent = missCounter;
}

[...document.querySelectorAll('.hole')].forEach((value) => {
    value.onclick = (event) => {
        event.target.className.includes('hole_has-mole') ? deadCounterElement.textContent = ++killCounter :
            lostCounterElement.textContent = ++missCounter;
        if (killCounter === 10 || missCounter === 5) {
            setTimeout(() => {
                alert(killCounter === 10 ? 'Победа!' : 'Вы проиграли!');
                clearStatistic();
            }, 0);
        }
    };
});
