const productGrid =
    document.getElementById("product-grid");


const shopTitle =
    document.getElementById("shop-title");


const shopDescription =
    document.getElementById("shop-description");


const noProductsMessage =
    document.getElementById(
        "no-products-message"
    );


const urlParameters =
    new URLSearchParams(
        window.location.search
    );


const selectedCategory =
    urlParameters.get("category");

const categoryInformation = {

    "lip-gloss": {
        title: "Lip Glosses",
        description:
            "Explore Obi Cosmetics lip gloss shades."
    },

    "lip-oil": {
        title: "Lip Oils",
        description:
            "Explore lightweight lip oils for shine and colour."
    },

    "blush": {
        title: "Blush",
        description:
            "Discover blush shades for your everyday look."
    },

    "liquid-lipstick": {
        title: "Liquid Lipsticks",
        description:
            "Explore liquid lip colours and finishes."
    },

    "body-care": {
        title: "Body Care",
        description:
            "Explore the Obi Cosmetics body care collection."
    },

    "lip-liner": {
        title: "Lip Liners",
        description:
            "Define and shape your lips with Obi Cosmetics lip liners."
    }

};

let productsToDisplay = products;


if (
    selectedCategory &&
    categoryInformation[selectedCategory]
) {

    productsToDisplay =
        products.filter(
            function (product) {

                return (
                    product.category ===
                    selectedCategory
                );

            }
        );


    shopTitle.textContent =
        categoryInformation[
            selectedCategory
        ].title;


    shopDescription.textContent =
        categoryInformation[
            selectedCategory
        ].description;

}

if (productsToDisplay.length === 0) {

    noProductsMessage.hidden = false;

} else {

    noProductsMessage.hidden = true;


    productsToDisplay.forEach(
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
                                        ${product.shades.length} colours
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
                        >
                            Add to Cart
                        </button>

                        <button
                            class="buy-now-button"
                            data-product-id="${product.id}"
                        >
                            Buy Now
                        </button>

                    </div>

                </article>
            `;

        }
    );

}