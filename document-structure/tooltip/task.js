'use strict';

const tooltip = document.createElement("div");
tooltip.classList.add('tooltip');
document.body.insertAdjacentElement("beforeEnd", tooltip);
tooltip.style.position = "absolute";

document.addEventListener('click', () => tooltip.classList.remove('tooltip_active'), true);

[...document.querySelectorAll('.has-tooltip')].forEach((value) => {
    value.addEventListener('click', (event) => {
        event.preventDefault();
        const linkCoordinates = event.currentTarget.getBoundingClientRect();
        tooltip.textContent = event.currentTarget.getAttribute('title');
        tooltip.classList.add('tooltip_active');
        switch (event.currentTarget.dataset.position) {
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
    });
});
