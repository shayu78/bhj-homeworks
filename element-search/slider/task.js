'use strict';

let currentSliderItemIndex = 0;

const sliderItems = document.querySelectorAll('.slider__item');

const sliderDots = document.querySelectorAll('.slider__dot');
if (sliderDots.item(currentSliderItemIndex)) sliderDots.item(currentSliderItemIndex).classList.add('slider__dot_active');

const countSliderItems = sliderItems.length;

[...sliderDots].forEach((element, index) => element.onclick = () => getSliderItem('specific', index));

document.querySelector('.slider__arrow_prev').onclick = () => getSliderItem('prev');

document.querySelector('.slider__arrow_next').onclick = () => getSliderItem('next');

function getSliderItem(direction, value = 0) {
    if (sliderItems.item(currentSliderItemIndex) &&
        sliderItems.item(currentSliderItemIndex).classList.contains('slider__item_active') &&
        sliderDots.item(currentSliderItemIndex) &&
        sliderDots.item(currentSliderItemIndex).classList.contains('slider__dot_active')) {
        sliderItems.item(currentSliderItemIndex).classList.remove('slider__item_active');
        sliderDots.item(currentSliderItemIndex).classList.remove('slider__dot_active');
        switch (direction) {
            case 'prev': {
                currentSliderItemIndex === 0 ? currentSliderItemIndex = countSliderItems - 1 : currentSliderItemIndex--;
                break;
            }
            case 'next': {
                currentSliderItemIndex === countSliderItems - 1 ? currentSliderItemIndex = 0 : currentSliderItemIndex++;
                break;
            }
            case 'specific': {
                currentSliderItemIndex = value;
                break;
            }
        }
        if (sliderItems.item(currentSliderItemIndex) && sliderDots.item(currentSliderItemIndex)) {
            sliderItems.item(currentSliderItemIndex).classList.add('slider__item_active');
            sliderDots.item(currentSliderItemIndex).classList.add('slider__dot_active');
        }
    }
}
