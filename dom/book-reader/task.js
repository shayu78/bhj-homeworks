'use strict';

[...document.querySelectorAll('.font-size')].forEach((value) => {
    value.addEventListener('click', (event) => setView(event, 'font-size_active', 'fs'));
});

[...document.querySelectorAll('.book__control_color .color')].forEach((value) => {
    value.addEventListener('click', (event) => setView(event, 'color_active', 'color'));
});

[...document.querySelectorAll('.book__control_background .color')].forEach((value) => {
    value.addEventListener('click', (event) => setView(event, 'color_active', 'bg'));
});

function setView(event, activeClass, controlWidget) {
    event.preventDefault();
    let widgetParam;
    let datasetParam;
    switch (controlWidget) {
        case 'fs': {
            widgetParam = 'book_fs-';
            datasetParam = 'size';
            break;
        }
        case 'color': {
            widgetParam = 'book_color-';
            datasetParam = 'color';
            break;
        }
        case 'bg': {
            widgetParam = 'book_bg-';
            datasetParam = 'color';
            break;
        }
        default: return;
    }

    const eventTargetElement = event.target;
    const activeElement = document.querySelector(`.${activeClass}`);
    if (activeElement !== eventTargetElement) {
        eventTargetElement.classList.add(`${activeClass}`);
        activeElement.classList.remove(`${activeClass}`);
        const bookElement = eventTargetElement.closest('.book');
        bookElement.classList.forEach((value) => {
            if (value.startsWith(widgetParam)) bookElement.classList.remove(value);
        });
        if (eventTargetElement.dataset[datasetParam]) bookElement.classList.add(`${widgetParam}${eventTargetElement.dataset[datasetParam]}`);
    }
}
