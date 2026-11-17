const productGrid =
    document.getElementById("product-grid");


const featuredProducts =
    products.filter(function (product) {

        return product.featured === true;

    });


featuredProducts.forEach(
    function (product) {

        const hasShades =
            Array.isArray(product.shades) &&
            product.shades.length > 0;


        const shadeHTML =
            hasShades
                ? product.shades
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
                    .join("")
                : "";


        productGrid.innerHTML += `
            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-price">
                    LE ${product.price}
                </p>


                ${
                    hasShades
                        ? `
                            <div class="shade-section">

                                <p class="shade-label">
                                    ${product.shades.length}
                                    colours
                                </p>

                                <div class="shade-list">
                                    ${shadeHTML}
                                </div>

                                <p class="selected-shade">
                                    Select a shade
                                </p>

                            </div>
                        `
                        : ""
                }


                <div class="product-actions">

                    <button
                        class="add-to-cart-button"
                        data-product-id="${product.id}"
                        type="button"
                    >
                        Add to Cart
                    </button>


                    <button
                        class="buy-now-button"
                        data-product-id="${product.id}"
                        type="button"
                    >
                        Buy Now
                    </button>

                </div>

            </article>
        `;

    }
);