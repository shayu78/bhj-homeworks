'use strict';

const textareaElement = document.querySelector('#editor');
textareaElement.value = localStorage.getItem('textEditor');
textareaElement.style.marginBottom = "10px";
textareaElement.style.display = "block";

const clearButtonElement = document.createElement("button");
const clearTextElement = document.createTextNode('Очистить содержимое');
clearButtonElement.appendChild(clearTextElement);

textareaElement.insertAdjacentElement('afterend', clearButtonElement);

document.querySelectorAll('button').forEach((value) => {
    value.style.margin = "0 10px 10px 0";
    value.style.padding = "5px";
});

clearButtonElement.addEventListener('click', (event) => {
    textareaElement.value = '';
    localStorage.removeItem('textEditor');
});

window.addEventListener('beforeunload', (event) => localStorage.setItem('textEditor', textareaElement.value));
