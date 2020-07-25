'use strict';

document.querySelector('#modal_main').classList.add('modal_active');

[...document.querySelectorAll('.modal__close')].forEach(element => {
    element.onclick = function () {
        this.closest('.modal').classList.remove('modal_active');
    }
});

document.querySelector('.show-success').onclick = function () {
    this.closest('.modal').classList.remove('modal_active');
    document.querySelector('#modal_success').classList.add('modal_active');
};
