'use strict';

const tasksList = document.querySelector('.tasks__list');
tasksList.innerHTML = localStorage.getItem('tasksKey');
// устанавливаем обработчики на удаление заданий, восстановленных из хранилища
[...document.querySelectorAll('.task__remove')].forEach((value) => {
    value.addEventListener("click", (event) => removeTask(event.currentTarget));
});

document.querySelector('.tasks__add').addEventListener("click", () => addTask(taskInput.value));
const taskInput = document.querySelector('.tasks__input');
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask(taskInput.value);
    }
});

function addTask(text) {
    if (text.trim()) {
        tasksList.insertAdjacentHTML('beforeEnd',
            `<div class="task">
            <div class="task__title">
                ${text}
            </div>
            <a href="#" class="task__remove">&times;</a>
        </div>`);
        localStorage.setItem('tasksKey', tasksList.innerHTML);
        tasksList.lastChild.querySelector('.task__remove').addEventListener("click", (event) => removeTask(event.currentTarget));
    }
}

function removeTask(element) {
    element.closest('.task').remove();
    localStorage.setItem('tasksKey', tasksList.innerHTML);
}
