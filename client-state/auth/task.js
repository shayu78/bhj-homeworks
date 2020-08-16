'use strict';

const signinElement = document.querySelector('.signin');
const welcomeElement = document.querySelector('.welcome');
const welcomeSpanElement = welcomeElement.querySelector('#user_id');

welcomeMessage(localStorage.getItem("sessionUserID"));

document.querySelector('#signin__form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status >= 200 && xhr.status < 400) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        localStorage.setItem("sessionUserID", data.user_id);
                        welcomeMessage(data.user_id);
                    } else alert("Неверный логин/пароль");
                } catch (exception) {
                    console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
                }
            } else console.log('Ошибка при обработке запроса');
        }
    };
    xhr.send(formData);
    event.currentTarget.reset();
});

function welcomeMessage(text) {
    if (text) {
        welcomeSpanElement.textContent = text;
        welcomeElement.classList.add('welcome_active');
        signinElement.classList.remove('signin_active');
    } else signinElement.classList.add('signin_active');
}

document.querySelector('#logout__btn').addEventListener('click', (event) => {
    localStorage.removeItem("sessionUserID");
    welcomeSpanElement.textContent = '';
    welcomeElement.classList.remove('welcome_active');
    signinElement.classList.add('signin_active');
});
