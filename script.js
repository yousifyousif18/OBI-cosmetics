const productGrid = document.getElementById("product-grid");

products.forEach(function (product) {

    const shadeHTML = product.shades
        .map(function (shade) {
            return `
                <button
                    class="shade-swatch"
                    style="background-color: ${shade.color}"
                    data-shade="${shade.name}"
                    aria-label="${shade.name}">
                </button>
            `;
        })
        .join("");

    productGrid.innerHTML += `
        <article class="product-card">

            <div class="product-image">

               <img
                 src="${product.image}"
                 alt="${product.name}"
                  loading="lazy"
                >

            </div>

            <h3>${product.name}</h3>

            <p class="product-price">
                LE ${product.price}
            </p>

            <div class="shade-section">

                <p class="shade-label">
                    ${product.shades.length} colours
                </p>

                <div class="shade-list">
                    ${shadeHTML}
                </div>

                <p class="selected-shade">
                    Select a shade
                </p>

            </div>

            <div class="product-actions">

              <button
                  class="add-to-cart-button"
                  data-product-id="${product.id}">
                  Add to Cart
              </button>

              <button
                 class="buy-now-button"
                  data-product-id="${product.id}">
                  Buy Now
              </button>

            </div>

        </article>
    `;
});
const shadeButtons = document.querySelectorAll(".shade-swatch");

shadeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const allShades =
            productCard.querySelectorAll(".shade-swatch");

        allShades.forEach(function (shade) {
            shade.classList.remove("selected");
        });

        button.classList.add("selected");

        const selectedShade =
            productCard.querySelector(".selected-shade");

        selectedShade.textContent =
            "Selected: " + button.dataset.shade;
    });

});
const buyNowButtons =
    document.querySelectorAll(".buy-now-button");

buyNowButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productId =
            Number(button.dataset.productId);

        const productCard =
            button.closest(".product-card");

        const selectedShade =
            productCard.querySelector(
                ".shade-swatch.selected"
            );

        if (!selectedShade) {
            alert("Please select a shade.");
            return;
        }

        const shadeName =
            selectedShade.dataset.shade;

        const buyNowItem = {
            productId: productId,
            shade: shadeName,
            quantity: 1
        };

        sessionStorage.setItem(
            "buyNowItem",
            JSON.stringify(buyNowItem)
        );

        window.location.href = "checkout.html";
    });

});

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const cartDrawer =
    document.getElementById("cart-drawer");

const cartOverlay =
    document.getElementById("cart-overlay");

const openCartButton =
    document.getElementById("open-cart-button");

const closeCartButton =
    document.getElementById("close-cart-button");

const continueShoppingButton =
    document.getElementById("continue-shopping-button");

const cartItemsContainer =
    document.getElementById("cart-items");

const cartSubtotalElement =
    document.getElementById("cart-subtotal");

const cartCountElement =
    document.getElementById("cart-count");

function openCart() {

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.classList.add("cart-open");

}


function closeCart() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.classList.remove("cart-open");

}

openCartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


continueShoppingButton.addEventListener(
    "click",
    closeCart
);


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function updateCartCount() {

    const totalItems =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    cartCountElement.textContent =
        totalItems;

}

const addToCartButtons =
    document.querySelectorAll(
        ".add-to-cart-button"
    );


addToCartButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productId =
                Number(button.dataset.productId);


            const productCard =
                button.closest(".product-card");


            const selectedShade =
                productCard.querySelector(
                    ".shade-swatch.selected"
                );


            if (!selectedShade) {

                alert("Please select a shade.");

                return;
            }


            const shadeName =
                selectedShade.dataset.shade;


            addToCart(
                productId,
                shadeName
            );

        }
    );

});

function addToCart(productId, shadeName) {

    const existingItem =
        cart.find(function (item) {

            return (
                item.productId === productId &&
                item.shade === shadeName
            );

        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            productId: productId,

            shade: shadeName,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    updateCartCount();

    openCart();

}

function renderCart() {

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">

                <p>
                    Your cart is empty.
                </p>

            </div>
        `;


        cartSubtotalElement.textContent =
            "LE 0";


        return;
    }


    cartItemsContainer.innerHTML = "";


    let subtotal = 0;


    cart.forEach(
        function (item, index) {

            const product =
                products.find(
                    function (product) {

                        return (
                            product.id ===
                            item.productId
                        );

                    }
                );


            if (!product) {
                return;
            }


            const shade =
                product.shades.find(
                    function (shade) {

                        return (
                            shade.name ===
                            item.shade
                        );

                    }
                );


            const itemTotal =
                product.price *
                item.quantity;


            subtotal += itemTotal;


            cartItemsContainer.innerHTML += `
                <article class="cart-item">

                    <div class="cart-item-top">

                        <div>

                            <h3>
                                ${product.name}
                            </h3>


                            <div class="cart-item-details">

                                <div class="cart-shade">

                                    ${
                                        shade
                                            ? `
                                        <span
                                            class="cart-shade-color"
                                            style="background-color: ${shade.color}">
                                        </span>
                                        `
                                            : ""
                                    }

                                    <span>
                                        ${item.shade}
                                    </span>

                                </div>


                                <p>
                                    LE ${product.price} each
                                </p>

                            </div>

                        </div>


                        <strong>
                            LE ${itemTotal}
                        </strong>

                    </div>


                    <div class="cart-quantity">

                        <button
                            class="decrease-cart-item"
                            data-index="${index}">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="increase-cart-item"
                            data-index="${index}">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-cart-item"
                        data-index="${index}">
                        Remove
                    </button>

                </article>
            `;

        }
    );


    cartSubtotalElement.textContent =
        "LE " + subtotal;

}

cartItemsContainer.addEventListener(
    "click",
    function (event) {

        const increaseButton =
            event.target.closest(
                ".increase-cart-item"
            );


        const decreaseButton =
            event.target.closest(
                ".decrease-cart-item"
            );


        const removeButton =
            event.target.closest(
                ".remove-cart-item"
            );


        if (increaseButton) {

            const index =
                Number(
                    increaseButton.dataset.index
                );


            cart[index].quantity += 1;


            saveCart();

            renderCart();

            updateCartCount();

        }


        if (decreaseButton) {

            const index =
                Number(
                    decreaseButton.dataset.index
                );


            if (cart[index].quantity > 1) {

                cart[index].quantity -= 1;

            }


            saveCart();

            renderCart();

            updateCartCount();

        }


        if (removeButton) {

            const index =
                Number(
                    removeButton.dataset.index
                );


            cart.splice(index, 1);


            saveCart();

            renderCart();

            updateCartCount();

        }

    }
);

renderCart();

updateCartCount();