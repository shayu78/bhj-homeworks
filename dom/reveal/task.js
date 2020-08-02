'use strict';

[...document.querySelectorAll('.reveal')].forEach((value) => {
    document.addEventListener('scroll', () => {
        isInViewport(value) ? value.classList.add('reveal_active') : value.classList.remove('reveal_active');
    });
});

const isInViewport = function (element) {
    const viewportHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    return elementTop <= viewportHeight && elementBottom >= 0 ? true : false;
}
