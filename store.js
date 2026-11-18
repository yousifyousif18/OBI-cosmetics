/* =========================================
   SHADE SELECTION
========================================= */

const shadeButtons =
    document.querySelectorAll(".shade-swatch");


shadeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productCard =
                button.closest(".product-card");


            const allShades =
                productCard.querySelectorAll(
                    ".shade-swatch"
                );


            allShades.forEach(function (shade) {

                shade.classList.remove("selected");

            });


            button.classList.add("selected");


            const selectedShadeText =
                productCard.querySelector(
                    ".selected-shade"
                );


            if (selectedShadeText) {

                selectedShadeText.textContent =
                    "Selected: " +
                    button.dataset.shade;

            }

        }
    );

});



/* =========================================
   BUY NOW
========================================= */

const buyNowButtons =
    document.querySelectorAll(
        ".buy-now-button"
    );


buyNowButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productId =
                Number(
                    button.dataset.productId
                );


            const product =
                products.find(
                    function (product) {

                        return (
                            product.id === productId
                        );

                    }
                );


            if (!product) {

                alert(
                    "Product could not be found."
                );

                return;
            }


            const productCard =
                button.closest(".product-card");


            let shadeName =
                "Not applicable";


            /*
                Only require shade selection
                if the product actually has shades.
            */

            if (
                Array.isArray(product.shades) &&
                product.shades.length > 0
            ) {

                const selectedShade =
                    productCard.querySelector(
                        ".shade-swatch.selected"
                    );


                if (!selectedShade) {

                    alert(
                        "Please select a shade."
                    );

                    return;
                }


                shadeName =
                    selectedShade.dataset.shade;

            }


            const buyNowItem = {

                productId: productId,

                shade: shadeName,

                quantity: 1

            };


            sessionStorage.setItem(
                "buyNowItem",
                JSON.stringify(buyNowItem)
            );


            sessionStorage.setItem(
                "checkoutMode",
                "buyNow"
            );


            window.location.href = window.OBILanguage ? window.OBILanguage.url("checkout.html") : "checkout.html";

        }
    );

});



/* =========================================
   CART DATA
========================================= */

let cart = getStoredCart();



/* =========================================
   CART ELEMENTS
========================================= */

const cartDrawer =
    document.getElementById(
        "cart-drawer"
    );


const cartOverlay =
    document.getElementById(
        "cart-overlay"
    );


const openCartButton =
    document.getElementById(
        "open-cart-button"
    );


const closeCartButton =
    document.getElementById(
        "close-cart-button"
    );


const continueShoppingButton =
    document.getElementById(
        "continue-shopping-button"
    );


const cartItemsContainer =
    document.getElementById(
        "cart-items"
    );


const cartSubtotalElement =
    document.getElementById(
        "cart-subtotal"
    );


const cartCountElement =
    document.getElementById(
        "cart-count"
    );


const cartCheckoutButton =
    document.getElementById(
        "cart-checkout-button"
    );



/* =========================================
   OPEN / CLOSE CART
========================================= */

let cartScrollPosition = 0;
let cartPreviousFocus = null;

cartDrawer.inert = true;
cartDrawer.setAttribute("role", "dialog");
cartDrawer.setAttribute("aria-label", "Shopping cart");

function openCart() {

    if (!document.body.classList.contains("cart-open")) {
        cartPreviousFocus = document.activeElement;
        cartScrollPosition = window.scrollY;
        document.body.style.setProperty(
            "--cart-scroll-offset",
            -cartScrollPosition + "px"
        );
    }

    document.documentElement.classList.add("cart-open");
    cartDrawer.inert = false;
    cartDrawer.setAttribute("aria-modal", "true");

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.classList.add(
        "cart-open"
    );

    closeCartButton.focus({ preventScroll: true });

}


function closeCart() {

    const wasOpen = document.body.classList.contains("cart-open");

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.classList.remove(
        "cart-open"
    );

    document.documentElement.classList.remove("cart-open");
    cartDrawer.inert = true;
    cartDrawer.removeAttribute("aria-modal");
    document.body.style.removeProperty("--cart-scroll-offset");

    if (wasOpen) {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, cartScrollPosition);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        if (cartPreviousFocus && cartPreviousFocus.isConnected) cartPreviousFocus.focus({ preventScroll: true });
    }

}


openCartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);

document.addEventListener("keydown", function (event) {
    if (!cartDrawer.classList.contains("open")) return;
    if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
    }
    if (event.key === "Tab") {
        const controls = Array.from(cartDrawer.querySelectorAll("button:not(:disabled), a[href], input, select, textarea, [tabindex='0']"))
            .filter(function (element) { return element.getClientRects().length > 0; });
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
});


cartOverlay.addEventListener(
    "click",
    closeCart
);


continueShoppingButton.addEventListener(
    "click",
    function () {

        window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";

    }
);



/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
    getCartStorageKey(),
    JSON.stringify(cart)
);

}



/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    const totalItems =
        cart.reduce(
            function (total, item) {

                return (
                    total +
                    item.quantity
                );

            },
            0
        );


    cartCountElement.textContent =
        totalItems;

}



/* =========================================
   ADD TO CART BUTTONS
========================================= */

const addToCartButtons =
    document.querySelectorAll(
        ".add-to-cart-button"
    );


addToCartButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        button.dataset.productId
                    );


                const product =
                    products.find(
                        function (product) {

                            return (
                                product.id ===
                                productId
                            );

                        }
                    );


                if (!product) {

                    alert(
                        "Product could not be found."
                    );

                    return;
                }


                const productCard =
                    button.closest(
                        ".product-card"
                    );


                let shadeName =
                    "Not applicable";


                if (
                    Array.isArray(
                        product.shades
                    ) &&
                    product.shades.length > 0
                ) {

                    const selectedShade =
                        productCard.querySelector(
                            ".shade-swatch.selected"
                        );


                    if (!selectedShade) {

                        alert(
                            "Please select a shade."
                        );

                        return;
                    }


                    shadeName =
                        selectedShade.dataset.shade;

                }


                addToCart(
                    productId,
                    shadeName
                );

            }
        );

    }
);



/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addToCart(
    productId,
    shadeName
) {

    const existingItem =
        cart.find(
            function (item) {

                return (
                    item.productId ===
                        productId &&
                    item.shade ===
                        shadeName
                );

            }
        );


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

    document.dispatchEvent(new CustomEvent("obi:cart-added"));

}



/* =========================================
   RENDER CART
========================================= */

function renderCart() {
    const hasMarket = Boolean(getSelectedMarketCode());
    cartCheckoutButton.textContent = hasMarket ? "Go to Checkout" : "Choose Delivery Country";

    cartDrawer.classList.toggle("is-empty", cart.length === 0);

    if (cart.length === 0) {

    cartItemsContainer.innerHTML = `
        <div class="empty-cart">

            <div class="empty-cart-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 23h32l3 32H13l3-32Z"></path>
                    <path d="M24 25V17a8 8 0 0 1 16 0v8"></path>
                    <path d="m28 38 3 3 6-7"></path>
                </svg>
            </div>

            <div class="empty-cart-copy">
                <h3>Your next favorite is waiting</h3>
                <p>Your cart is empty. Explore OBI and find something you&rsquo;ll love.</p>
            </div>

            ${!hasMarket ? `<button type="button" class="empty-cart-shop-button" data-choose-cart-market>Choose Delivery Country</button>` : `
            <a
                href="shop.html"
                class="empty-cart-shop-button"
            >
                Explore the Shop
                <span aria-hidden="true">&rarr;</span>
            </a>
            `}

        </div>
    `;


    cartItemsContainer.querySelector("[data-choose-cart-market]")?.addEventListener("click", function () {
        openPurchaseMarketPicker();
    });

    cartSubtotalElement.textContent =
        "0";


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


            let shade = null;


            if (
                Array.isArray(
                    product.shades
                )
            ) {

                shade =
                    product.shades.find(
                        function (shade) {

                            return (
                                shade.name ===
                                item.shade
                            );

                        }
                    );

            }


            const productPrice =
                getProductNumericPrice(
                    product
                );


            const itemTotal =
                productPrice *
                item.quantity;


            subtotal += itemTotal;


            cartItemsContainer.innerHTML += `
                <article class="cart-item">

                    <div class="cart-product-row">


                        <!-- PRODUCT IMAGE -->

                     <a
    href="shop.html?category=${product.category}&product=${product.id}"
    class="cart-product-image cart-product-link"
    aria-label="View ${product.name}"
>

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                            >

                        </a>


                        <!-- PRODUCT INFORMATION -->

                        <div class="cart-product-info">


                            <div class="cart-item-top">


                                <div>

                                    <h3>
                                        ${product.name}
                                    </h3>


                                    <div class="cart-item-details">

                                        ${
                                            item.shade !==
                                            "Not applicable"
                                                ? `
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
                                                `
                                                : ""
                                        }


                                        <p>
                                            ${formatMoney(productPrice)} each
                                        </p>

                                    </div>

                                </div>


                                <strong>
                                    ${formatMoney(itemTotal)}
                                </strong>


                            </div>


                            <!-- QUANTITY -->

                            <div class="cart-quantity">

                                <button
                                    class="decrease-cart-item"
                                    data-index="${index}"
                                    type="button"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>


                                <span>
                                    ${item.quantity}
                                </span>


                                <button
                                    class="increase-cart-item"
                                    data-index="${index}"
                                    type="button"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>

                            </div>


                            <!-- REMOVE -->

                            <button
                                class="remove-cart-item"
                                data-index="${index}"
                                type="button"
                            >
                                Remove
                            </button>


                        </div>

                    </div>

                </article>
            `;

        }
    );


    cartSubtotalElement.textContent =
        formatMoney(
            subtotal
        );

}



/* =========================================
   CART QUANTITY / REMOVE
========================================= */

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


            if (
                cart[index].quantity > 1
            ) {

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


            cart.splice(
                index,
                1
            );


            saveCart();

            renderCart();

            updateCartCount();

        }

    }
);



/* =========================================
   GO TO CHECKOUT
========================================= */

cartCheckoutButton.addEventListener(
    "click",
    function () {
        if (!getSelectedMarketCode()) {
            openPurchaseMarketPicker();
            return;
        }


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        sessionStorage.setItem(
            "checkoutMode",
            "cart"
        );


        window.location.href = window.OBILanguage ? window.OBILanguage.url("checkout.html") : "checkout.html";

    }
);



/* =========================================
   INITIAL PAGE LOAD
========================================= */

renderCart();

updateCartCount();
