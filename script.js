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
}
);

    openCart();

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

const cartCheckoutButton =
    document.getElementById("cart-checkout-button");


cartCheckoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        sessionStorage.setItem(
            "checkoutMode",
            "cart"
        );

        window.location.href =
            "checkout.html";

    }
);

renderCart();

updateCartCount();