'use strict';

if (getCookieValue('closeSubscribe') !== 'yes') document.querySelector('#subscribe-modal').classList.add('modal_active');

document.querySelector('.modal__close').addEventListener('click', (event) => {
    event.target.closest('.modal').classList.remove('modal_active');
    document.cookie = 'closeSubscribe=yes';
});

function getCookieValue(name) {
    const value = `${document.cookie};`;
    const startIndex = value.indexOf(`${name}=`);
    if (startIndex !== -1) return value.substring(startIndex + name.length + 1, value.indexOf(';', startIndex));
}
