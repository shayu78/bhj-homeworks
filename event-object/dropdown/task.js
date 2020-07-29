'use strict';

[...document.querySelectorAll('.dropdown')].forEach((element) => {
    element.addEventListener('click', (event) => {
        event.currentTarget.querySelector('.dropdown__list').classList.toggle('dropdown__list_active');
    });
});

[...document.querySelectorAll('.dropdown__link')].forEach((element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.closest('.dropdown').querySelector('.dropdown__value').textContent = event.target.textContent;
    });
});
