'use strict';

const textareaElement = document.querySelector('#editor');
textareaElement.value = localStorage.getItem('textEditor');
textareaElement.style.marginBottom = "10px";
textareaElement.style.display = "block";

const saveButtonElement = document.createElement("button");
const clearButtonElement = document.createElement("button");
const saveTextElement = document.createTextNode('Сохранить содержимое');
const clearTextElement = document.createTextNode('Очистить содержимое');
saveButtonElement.appendChild(saveTextElement);
clearButtonElement.appendChild(clearTextElement);

saveButtonElement.dataset.operation = 'save';
clearButtonElement.dataset.operation = 'clear';

textareaElement.insertAdjacentElement('afterend', saveButtonElement);
saveButtonElement.insertAdjacentElement('afterend', clearButtonElement);

document.querySelectorAll('button').forEach((value) => {
    value.style.margin = "0 10px 10px 0";
    value.style.padding = "5px";
});

document.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        switch (event.target.dataset.operation) {
            case 'save': {
                localStorage.setItem('textEditor', textareaElement.value);
                break;
            }
            case 'clear': {
                textareaElement.value = '';
                localStorage.removeItem('textEditor');
                break;
            }
            default:
        }
    }
});
