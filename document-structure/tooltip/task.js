'use strict';

[...document.querySelectorAll('.has-tooltip')].forEach((value) => {
    value.insertAdjacentHTML('afterend', `<div class="tooltip">${value.getAttribute('title')}</div>`);
    const tooltip = value.nextElementSibling;
    tooltip.style.position = "absolute";
    tooltip.dataset.position = "bottom";

    value.addEventListener('click', (event) => {
        event.preventDefault();
        const linkCoordinates = event.currentTarget.getBoundingClientRect();
        const activeTooltip = document.querySelector('.tooltip_active');
        tooltip.classList.add('tooltip_active');
        switch (tooltip.dataset.position) {
            case "top": {
                tooltip.style.top = `${linkCoordinates.top + window.pageYOffset - tooltip.offsetHeight - 5}px`;
                tooltip.style.left = `${linkCoordinates.left}px`;
                break;
            }
            case "right": {
                tooltip.style.top = `${linkCoordinates.top + window.pageYOffset}px`;
                tooltip.style.left = `${linkCoordinates.left + linkCoordinates.width + 5}px`;
                break;
            }
            case "bottom": {
                tooltip.style.top = `${linkCoordinates.bottom + window.pageYOffset + 5}px`;
                tooltip.style.left = `${linkCoordinates.left}px`;
                break;
            }
            case "left": {
                tooltip.style.top = `${linkCoordinates.top + window.pageYOffset}px`;
                tooltip.style.left = `${linkCoordinates.left - tooltip.getBoundingClientRect().width - 5}px`;
                break;
            }
            default: {
                tooltip.style.top = `${linkCoordinates.bottom + window.pageYOffset + 5}px`;
                tooltip.style.left = `${linkCoordinates.left}px`;
            }
        }
        if (activeTooltip) activeTooltip.classList.remove('tooltip_active');
    });
});
