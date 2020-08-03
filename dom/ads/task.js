'use strict';

[...document.querySelectorAll('.rotator')].forEach((value) => {
    function rotation() {
        clearInterval(interval);

        const currentCase = activeCase.nextElementSibling ? activeCase.nextElementSibling : value.firstElementChild;
        currentCase.style.color = currentCase.dataset.color;
        speed = currentCase.dataset.speed;

        if (currentCase !== activeCase) {
            activeCase.classList.remove('rotator__case_active');
            currentCase.classList.add('rotator__case_active');
            activeCase = currentCase;
        }

        interval = setInterval(rotation, speed);
    }

    let activeCase = value.querySelector('.rotator__case_active');
    if (!activeCase) return;
    activeCase.style.color = activeCase.dataset.color;
    let speed = activeCase.dataset.speed;
    let interval = setInterval(rotation, speed);
});
