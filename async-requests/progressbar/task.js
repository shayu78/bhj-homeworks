"use strict";

const progressElement = document.querySelector('#progress');
const formElement = document.querySelector('#form');
formElement.addEventListener('submit', (event) => {
    const formData = new FormData(formElement);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");

    xhr.upload.addEventListener("loadstart", (event) => progressElement.value = 0);
    xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) progressElement.value = event.loaded / event.total;
        else progressElement.value >= 1 ? progressElement.value = 0 : progressElement.value += 0.1;
    });
    xhr.upload.addEventListener("load", (event) => {
        progressElement.value = 1;
        alert('Файл успешно загружен на сервер!')
    });
    xhr.upload.addEventListener("error", (event) => alert('Ошибка загрузки файла на сервер'));

    xhr.send(formData);
    event.preventDefault();
});
