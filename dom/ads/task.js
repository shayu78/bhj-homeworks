'use strict';

[...document.querySelectorAll('.rotator')].forEach((value) => {
    function rotation() {
        clearInterval(interval);

        const currentCase = activeCase.nextElementSibling ? activeCase.nextElementSibling : value.firstElementChild;
        currentCase.style.color = currentCase.getAttribute("data-color");
        speed = currentCase.getAttribute("data-speed");

        if (currentCase !== activeCase) {
            activeCase.classList.remove('rotator__case_active');
            currentCase.classList.add('rotator__case_active');
            activeCase = currentCase;
        }

        interval = setInterval(rotation, speed);
    }

    let activeCase = value.querySelector('.rotator__case_active');
    if (!activeCase) return;
    activeCase.style.color = activeCase.getAttribute("data-color");
    let speed = activeCase.getAttribute("data-speed");
    let interval = setInterval(rotation, speed);
});
