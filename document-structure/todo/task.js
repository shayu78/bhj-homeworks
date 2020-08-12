'use strict';

const tasksList = document.querySelector('.tasks__list');

let tasksLSArray = JSON.parse(localStorage.getItem("tasksKey"));
tasksLSArray ? tasksList.innerHTML = tasksLSArray.map((value) => getTaskMarkup(value)).join('') : tasksLSArray = [];

// устанавливаем обработчики на удаление заданий, восстановленных из хранилища
[...document.querySelectorAll('.task__remove')].forEach((value) => {
    value.addEventListener("click", (event) => removeTask(event.currentTarget));
});

document.querySelector('.tasks__add').addEventListener("click", (event) => {
    event.preventDefault();
    addTask(taskInput.value);
});

const taskInput = document.querySelector('.tasks__input');
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask(taskInput.value);
    }
});

function addTask(text) {
    if (tasksLSArray.includes(text)) return;
    taskInput.value = '';
    if (text.trim()) {
        tasksList.insertAdjacentHTML('beforeEnd', getTaskMarkup(text));
        tasksLSArray.push(text);
        localStorage.setItem('tasksKey', JSON.stringify(tasksLSArray));
        tasksList.lastChild.querySelector('.task__remove').addEventListener("click", (event) => removeTask(event.currentTarget));
    }
}

function removeTask(element) {
    const taskElement = element.closest('.task');
    tasksLSArray = tasksLSArray.filter((value) => value !== taskElement.querySelector('.task__title').textContent.trim());
    localStorage.setItem('tasksKey', JSON.stringify(tasksLSArray));
    taskElement.remove();
}

function getTaskMarkup(text) {
    return `<div class="task">
    <div class="task__title">
    ${text}
    </div>
    <a href="#" class="task__remove">&times;</a>
    </div>`;
}
