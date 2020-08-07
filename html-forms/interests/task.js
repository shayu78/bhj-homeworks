'use strict';

[...document.querySelectorAll('.interest__check')].forEach((value) => {
    value.addEventListener('change', (event) => {
        let currentCheckElement = event.currentTarget;

        // устанавливаем значения для дочерних элементов
        [...currentCheckElement.closest('.interest').querySelectorAll('.interest__check')].forEach((item) => {
            item.indeterminate = false;
            item.checked = currentCheckElement.checked;
        });

        // устанавливаем значения для родительских элементов
        while (currentCheckElement) {
            try {
                const listContainer = currentCheckElement.closest('.interests .interests_active');
                
                const parent = listContainer.parentElement.querySelector('.interest__check');    // определяем родительский элемент
                // находим дочерние элементы только первого уровня вложенности
                const childs = [...parent.closest('.interest').querySelector('.interests .interests_active').children].map((value) => value.querySelector('.interest__check'));

                // по умолчанию родительский элемент не выделен
                parent.checked = false;
                parent.indeterminate = false;
                if (childs.every((value) => value.checked && !value.indeterminate)) {     // все дочерние элементы выбраны и нет элементов с неопределенным состоянием
                    parent.checked = true;
                    parent.indeterminate = false;
                } else if (childs.some((value) => value.checked || value.indeterminate)) {    // хотя бы один дочерний элемент выбран или находится в неопределенном состоянии
                    parent.checked = false;
                    parent.indeterminate = true;
                }
    
                currentCheckElement = listContainer.closest('.interest');
            } catch (exception) {
                break;
            }
        }
    });
});
