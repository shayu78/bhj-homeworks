'use strict';

[...document.querySelectorAll('.menu_main')].forEach((item) => {
    [...document.querySelectorAll(`#${item.id} .menu__link`)].forEach((element) => {
        element.onclick = function () {
            const menuSubElement = element.closest('.menu__item').querySelector('.menu_sub');
            if (menuSubElement) {
                // получаем элемент активного меню
                const menuActiveElement = document.querySelector(`#${item.id} .menu_active`);
                menuSubElement.classList.toggle('menu_active');
                if (menuActiveElement) menuActiveElement.classList.remove('menu_active');
                return false;
            }
        };
    });
});
