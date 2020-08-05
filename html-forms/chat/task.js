'use strict';

const robotMessages = [
    'Как дела?',
    'Как вас зовут?',
    'Я устал',
    'Отлучусь на пару минут',
    'Я вам не грубил',
    'Куда бы хотели пойти...'
];

let lastActivityTime;       // время последней активности в чате
const timeout = 30;         // интервал простоя чата (в секундах)
let idInterval;

document.querySelector('.chat-widget__side-text').addEventListener('click', () => {
    document.querySelector('.chat-widget').classList.add('chat-widget_active');
    lastActivityTime = Date.now();
    idInterval = setInterval(timeoutRobotMessage, timeout * 1000);
});

const messagesList = document.querySelector('.chat-widget__messages');
const messagesListContainer = document.querySelector('.chat-widget__messages-container');

document.querySelector('.chat-widget__input').addEventListener('keyup', (event) => {
    clearInterval(idInterval);
    if (event.key === 'Enter' && event.currentTarget.value.trim()) {
        const isOnBottom = (messagesListContainer.scrollHeight - messagesListContainer.scrollTop) === messagesListContainer.clientHeight;
        const currentTime = new Date();
        const { hours, minutes } = formatTime(currentTime);
        messagesList.innerHTML += `
        <div class="message message_client">
            <div class="message__time">${hours}:${minutes}</div>
            <div class="message__text">${event.currentTarget.value}</div>
        </div>
        `;
        event.currentTarget.value = '';

        // ответ от робота
        messagesList.innerHTML += `
        <div class="message">
            <div class="message__time">${hours}:${minutes}</div>
            <div class="message__text">${robotMessages[Math.floor(Math.random() * robotMessages.length)]}</div>
        </div>
        `;

        if (isOnBottom) messagesListContainer.scrollTop = messagesListContainer.scrollHeight;

        lastActivityTime = currentTime.getTime();
    }
    idInterval = setInterval(timeoutRobotMessage, timeout * 1000);
});

function timeoutRobotMessage() {
    const isOnBottom = (messagesListContainer.scrollHeight - messagesListContainer.scrollTop) === messagesListContainer.clientHeight;
    const currentTime = new Date();
    if ((currentTime.getTime() - lastActivityTime) >= timeout * 1000) {
        const { hours, minutes } = formatTime(currentTime);
        messagesList.innerHTML += `
        <div class="message">
            <div class="message__time">${hours}:${minutes}</div>
            <div class="message__text">Чего молчим!? Я жду!!!</div>
        </div>
        `;

        if (isOnBottom) messagesListContainer.scrollTop = messagesListContainer.scrollHeight;
    }
}

function formatTime(dateTime) {
    const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
    return {
        hours,
        minutes
    };
}
