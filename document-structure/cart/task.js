'use strict';

const cartProductsList = document.querySelector('.cart__products');
cartProductsList.innerHTML = localStorage.getItem('cartProductsKey');
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

        if (!cartProductsList.hasChildNodes()) {
            xOffset = (currentX - document.body.clientWidth / 2) / step;
            yOffset = (currentY - document.body.clientTop) / step;
            productOperationAnimation("add");
        } else {
            cartProductInfo = getProductInfoFromCart(value.dataset.id);
            if (!cartProductInfo.element) {
                xOffset = (currentX - (cartProductsList.lastChild.offsetLeft + cartProductsList.lastChild.offsetWidth)) / step;
                yOffset = (currentY - cartProductsList.clientTop) / step;
                productOperationAnimation("add");
            }
            else {
                xOffset = (currentX - cartProductInfo.coords.left) / step;
                yOffset = (currentY - (cartProductInfo.coords.top + window.pageYOffset)) / step;
                productOperationAnimation("update");
            }
        }

        function productOperationAnimation(operationType) {
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
                            cartProductsList.insertAdjacentHTML('beforeEnd',
                                `<div class="cart__product" data-id="${value.dataset.id}">
                                <img class="cart__product-image" src="${value.querySelector('.product__image').getAttribute("src")}">
                                <div class="cart__product-count">${productCount.textContent}</div>
                                <div class="product__remove">Удалить из корзины</div>
                            </div>`);
                            cartProductsList.lastChild.querySelector('.product__remove').addEventListener("click", (event) => removeProduct(event.currentTarget));
                            break;
                        }
                        case "update": {
                            cartProductInfo.element.querySelector('.cart__product-count').textContent = +cartProductInfo.element.querySelector('.cart__product-count').textContent + +productCount.textContent;
                            break;
                        }
                        default: {
                            return;
                        }
                    }
                    localStorage.setItem('cartProductsKey', cartProductsList.innerHTML);
                    if (!isCartEmpty()) cartElement.classList.add('cart_active');
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
    return [...cartProductsList.querySelectorAll('.cart__product')].length === 0;
}

function removeProduct(element) {
    element.closest('.cart__product').remove();
    if (isCartEmpty()) cartElement.classList.remove('cart_active');
    localStorage.setItem('cartProductsKey', cartProductsList.innerHTML);
}
