'use strict';

const cartProductsList = document.querySelector('.cart__products');

let cartLSArray;
try {
    cartLSArray = JSON.parse(localStorage.getItem("cartProductsKey"));
    cartLSArray ? cartProductsList.innerHTML = cartLSArray.map((value) => getCartProductMarkup(value)).join('') : cartLSArray = [];
} catch (exception) {
    console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
    cartLSArray = [];
}

// устанавливаем обработчики на удаление продуктов, восстановленных из хранилища
[...document.querySelectorAll('.product__remove')].forEach((value) => {
    value.addEventListener("click", (event) => removeProduct(event.currentTarget));
});
const cartElement = document.querySelector('.cart');
if (!isCartEmpty()) cartElement.classList.add('cart_active');

[...document.querySelectorAll('.product')].forEach((value) => {
    const decProductCount = value.querySelector('.product__quantity-control_dec');
    const incProductCount = value.querySelector('.product__quantity-control_inc');
    const productCount = value.querySelector('.product__quantity-value');
    const productAddButton = value.querySelector('.product__add');
    decProductCount.addEventListener("click", () => {
        if (productCount.textContent > 1) productCount.textContent--;
    });
    incProductCount.addEventListener("click", () => {
        productCount.textContent++;
    });
    productAddButton.addEventListener("click", () => {
        const productImage = value.closest('.product').querySelector('.product__image');
        const productImageCoordinates = productImage.getBoundingClientRect();

        let step = 25;
        let currentX = productImageCoordinates.left;
        let currentY = productImageCoordinates.top + window.pageYOffset;
        let xOffset = 0;
        let yOffset = 0;

        const cloneProductImage = productImage.cloneNode(true);
        cloneProductImage.style.position = "absolute";
        cloneProductImage.style.opacity = "0.5";
        cloneProductImage.style.top = `${currentY}px`;
        cloneProductImage.style.left = `${currentX}px`;
        value.appendChild(cloneProductImage);
        let cartProductInfo = {};

        const cartLSIndex = cartLSArray.findIndex((item) => item.id === value.dataset.id);
        if (cartLSArray.length === 0 || cartLSIndex === -1) {
            // корзина пустая или в ней отсутствует такой товар - добавляем
            cartLSArray.push({
                id: value.dataset.id,
                image: value.querySelector('.product__image').getAttribute("src"),
                count: +productCount.textContent
            });
            xOffset = (currentX - document.body.clientWidth / 2) / step;
            yOffset = (currentY - document.body.clientTop) / step;
            productOperationAnimation("add", cartLSArray.slice(-1)[0]);
        } else {
            // товар уже есть в корзине - обновляем
            cartProductInfo = getProductInfoFromCart(value.dataset.id);
            if (cartProductInfo.element) {
                cartLSArray[cartLSIndex].count += +productCount.textContent;
                xOffset = (currentX - cartProductInfo.coords.left) / step;
                yOffset = (currentY - (cartProductInfo.coords.top + window.pageYOffset)) / step;
                productOperationAnimation("update", cartLSArray[cartLSIndex]);
            } else cloneProductImage.remove();
        }
        localStorage.setItem('cartProductsKey', JSON.stringify(cartLSArray));

        function productOperationAnimation(operationType, data) {
            const interval = setInterval(() => {
                step--;
                currentX -= xOffset;
                currentY -= yOffset;
                cloneProductImage.style.left = `${currentX}px`;
                cloneProductImage.style.top = `${currentY}px`;
                if (step === 0) {
                    clearInterval(interval);
                    cloneProductImage.remove();
                    switch (operationType) {
                        case "add": {
                            cartProductsList.insertAdjacentHTML('beforeEnd', getCartProductMarkup(data));
                            cartProductsList.lastChild.querySelector('.product__remove').addEventListener("click", (event) => removeProduct(event.currentTarget));
                            break;
                        }
                        case "update": {
                            cartProductInfo.element.querySelector('.cart__product-count').textContent = data.count;
                            break;
                        }
                        default: {
                            return;
                        }
                    }
                    cartElement.classList.add('cart_active');
                }
            }, 10);
        };
    });
});

function getProductInfoFromCart(id) {
    let productInfo = {};
    const cartProduct = [...cartProductsList.querySelectorAll('.cart__product')].find((value) => {
        return value.dataset.id === id;
    });
    if (cartProduct) {
        productInfo.element = cartProduct;
        productInfo.coords = cartProduct.querySelector('.cart__product-image').getBoundingClientRect();
    }
    return productInfo;
}

function isCartEmpty() {
    return cartLSArray.length === 0;
}

function removeProduct(element) {
    const productElement = element.closest('.cart__product');
    cartLSArray = cartLSArray.filter((value) => value.id !== productElement.dataset.id);
    localStorage.setItem('cartProductsKey', JSON.stringify(cartLSArray));
    productElement.remove();
    if (isCartEmpty()) cartElement.classList.remove('cart_active');
}

function getCartProductMarkup(data) {
    return `<div class="cart__product" data-id="${data.id}">
        <img class="cart__product-image" src="${data.image}">
        <div class="cart__product-count">${data.count}</div>
        <div class="product__remove">Удалить из корзины</div>
    </div>`;
}
