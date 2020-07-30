'use strict';

[...document.querySelectorAll('.tabs')].forEach((item) => {
    const tabContentList = document.querySelectorAll(`#${item.id} .tab__content`);
    [...document.querySelectorAll(`#${item.id} .tab`)].forEach((value, index) => {
        value.addEventListener('click', (event) => {
            // получаем элементы активной вкладки и активного контента
            const tabActiveElement = event.target.closest(`#${item.id}`).querySelector('.tab_active');
            const tabContentActiveElement = event.target.closest(`#${item.id}`).querySelector('.tab__content_active');

            // устанавливаем активные вкладку и контент
            event.target.classList.add('tab_active');
            [...tabContentList][index].classList.add('tab__content_active');

            if (tabActiveElement) tabActiveElement.classList.remove('tab_active');
            if (tabContentActiveElement) tabContentActiveElement.classList.remove('tab__content_active');
        });
    });
});
