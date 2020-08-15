"use strict";

const itemsList = document.querySelector('#items');

let dataLSArray;
try {
    dataLSArray = JSON.parse(localStorage.getItem("valuteInfoKey"));
    dataLSArray ? itemsList.innerHTML = dataLSArray.reduce((dataHTML, value) => dataHTML + getValuteMarkup(value), '') : dataLSArray = [];
} catch (exception) {
    console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
    dataLSArray = [];
}

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://netology-slow-rest.herokuapp.com");
xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
            document.querySelector('.loader').classList.remove('loader_active');
            try {
                const valuteInfo = JSON.parse(xhr.responseText);
                const dataArray = Object.entries(valuteInfo.response.Valute);
                let dataHTML = '';
                dataLSArray = dataArray.map((value) => {
                    const data = {
                        charCode: value[1].CharCode,
                        value: value[1].Value
                    };
                    dataHTML += getValuteMarkup(data);
                    return data;
                });
                localStorage.setItem('valuteInfoKey', JSON.stringify(dataLSArray));
                itemsList.innerHTML = dataHTML;
            } catch (exception) {
                console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
                return;
            }
        } else console.error(`Ошибка ${xhr.status}`);
    }
};
xhr.send();

function getValuteMarkup(data) {
    return `<div class="item">
    <div class="item__code">
        ${data.charCode}
    </div>
    <div class="item__value">
        ${data.value}
    </div>
    <div class="item__currency">
        руб.
    </div>
    </div>`;
}
