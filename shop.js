/* =========================================
   SHOP ELEMENTS
========================================= */

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

const shopResultCount =
    document.getElementById(
        "shop-result-count"
    );


/* =========================================
   READ CATEGORY FROM URL
========================================= */

const urlParameters =
    new URLSearchParams(
        window.location.search
    );

const selectedCategory =
    urlParameters.get("category");


/* =========================================
   CATEGORY INFORMATION
========================================= */

const categoryInformation = {

    "lip-gloss": {
        title: "Lip Glosses",
        description:
            "Gloss, shine and colour for every mood."
    },

    "lip-oil": {
        title: "Lip Oils",
        description:
            "Soft shine and lightweight lip colour."
    },

    "lip-liner": {
        title: "Lip Liners",
        description:
            "Shape, define and create your lip look."
    },

    "blush": {
        title: "Blush",
        description:
            "Add a little colour to your everyday look."
    },

    "liquid-lipstick": {
        title: "Liquid Lipsticks",
        description:
            "Colour that makes the look yours."
    },

    "body-care": {
        title: "Body Care",
        description:
            "A little Obi care beyond the lips."
    }

};


/* =========================================
   FILTER PRODUCTS
========================================= */

let productsToDisplay =
    products;


if (
    selectedCategory &&
    categoryInformation[
        selectedCategory
    ]
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


/* =========================================
   ACTIVE CATEGORY BUTTON
========================================= */

const categoryFilters =
    document.querySelectorAll(
        ".obi-shop-filter"
    );


categoryFilters.forEach(
    function (filter) {

        const filterCategory =
            filter.dataset.category;


        const isActive =
            (
                !selectedCategory &&
                filterCategory === "all"
            )
            ||
            (
                selectedCategory ===
                filterCategory
            );


        if (isActive) {

            filter.classList.add(
                "active"
            );

        }

    }
);


/* =========================================
   RESULT COUNT
========================================= */

if (shopResultCount) {

    const productWord =
        productsToDisplay.length === 1
            ? "product"
            : "products";


    shopResultCount.textContent =
        productsToDisplay.length +
        " " +
        productWord;

}


/* =========================================
   RENDER PRODUCTS
========================================= */

if (
    productsToDisplay.length === 0
) {

    noProductsMessage.hidden =
        false;

} else {

    noProductsMessage.hidden =
        true;


    productsToDisplay.forEach(
        function (product) {

            const hasShades =
                Array.isArray(
                    product.shades
                ) &&
                product.shades.length > 0;


            const optionText =
                hasShades
                    ? (
                        product.shades.length +
                        (
                            product.shades.length === 1
                                ? " shade"
                                : " shades"
                        )
                    )
                    : "View product";


            const actionText =
                hasShades
                    ? "Choose Shades"
                    : "View Product";


            productGrid.innerHTML += `
                <article
                    class="obi-product-card"
                    data-product-id="${product.id}"
                >

                    <button
                        class="obi-product-image-button open-product-button"
                        type="button"
                        data-product-id="${product.id}"
                        aria-label="View ${product.name}"
                    >

                        <div class="obi-product-image">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                            >

                        </div>


                        <span class="obi-product-option-count">
                            ${optionText}
                        </span>

                    </button>


                    <div class="obi-product-info">

                        <div class="obi-product-heading">

                            <h2>
                                ${product.name}
                            </h2>

                            <p class="obi-product-price">
                                LE ${product.price}
                            </p>

                        </div>


                        <p class="obi-product-description">
                            ${product.description}
                        </p>


                        <button
                            class="obi-product-open open-product-button"
                            type="button"
                            data-product-id="${product.id}"
                        >
                            ${actionText}

                            <span>
                                →
                            </span>
                        </button>

                    </div>

                </article>
            `;

        }
    );

}


/* =========================================
   PRODUCT QUICK VIEW
========================================= */

const productModal =
    document.getElementById(
        "product-modal"
    );

const productModalOverlay =
    document.getElementById(
        "product-modal-overlay"
    );

const closeProductModalButton =
    document.getElementById(
        "close-product-modal"
    );

const modalImage =
    document.getElementById(
        "product-modal-image"
    );

const modalTitle =
    document.getElementById(
        "product-modal-title"
    );

const modalPrice =
    document.getElementById(
        "product-modal-price"
    );

const modalDescription =
    document.getElementById(
        "product-modal-description"
    );

const modalShadeSection =
    document.getElementById(
        "product-modal-shade-section"
    );

const modalShadeCount =
    document.getElementById(
        "product-modal-shade-count"
    );

const modalShades =
    document.getElementById(
        "product-modal-shades"
    );

const modalSelectedShade =
    document.getElementById(
        "product-modal-selected-shade"
    );

const modalAddToCart =
    document.getElementById(
        "modal-add-to-cart"
    );

const modalBuyNow =
    document.getElementById(
        "modal-buy-now"
    );
    const modalPreviewLabel =
    document.getElementById(
        "product-modal-preview-label"
    );

const modalPhotoNote =
    document.getElementById(
        "product-modal-photo-note"
    );


let currentModalProduct = null;

let currentModalShade = null;


/* =========================================
   OPEN PRODUCT
========================================= */

function openProductModal(
    productId
) {

    const product =
        products.find(
            function (item) {

                return (
                    item.id === productId
                );

            }
        );


    if (!product) {
        return;
    }


    currentModalProduct =
        product;

    currentModalShade =
        null;


    modalTitle.textContent =
        product.name;


    modalPrice.textContent =
        "LE " + product.price;


    modalDescription.textContent =
        product.description;


    modalImage.src =
        product.image;


    modalImage.alt =
        product.name;

modalPreviewLabel.textContent =
    "PRODUCT PHOTO";

modalPhotoNote.textContent =
    "Product shown for reference.";

    const hasShades =
        Array.isArray(
            product.shades
        ) &&
        product.shades.length > 0;


    if (hasShades) {

        modalShadeSection.hidden =
            false;


        modalShadeCount.textContent =
            product.shades.length +
            (
                product.shades.length === 1
                    ? " shade"
                    : " shades"
            );


        modalSelectedShade.textContent =
            "Select a shade";


        modalShades.innerHTML =
            "";


        product.shades.forEach(
            function (
                shade,
                index
            ) {

                modalShades.innerHTML += `
                    <button
                        class="product-modal-shade"
                        type="button"
                        data-shade-index="${index}"
                        aria-label="${shade.name}"
                        aria-pressed="false"
                    >

                        <span
                            class="product-modal-shade-colour"
                            style="
                                background-color:
                                ${shade.color};
                            "
                        >
                        </span>

                        <span
                            class="product-modal-shade-name"
                        >
                            ${shade.name}
                        </span>

                    </button>
                `;

            }
        );


        modalAddToCart.disabled =
            true;

        modalBuyNow.disabled =
            true;

    }
    else {

        modalShadeSection.hidden =
            true;


        currentModalShade =
            "Not applicable";


        modalAddToCart.disabled =
            false;

        modalBuyNow.disabled =
            false;

    }


    productModal.classList.add(
        "open"
    );

    productModalOverlay.classList.add(
        "open"
    );

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "product-modal-open"
    );

}


/* =========================================
   CLOSE PRODUCT
========================================= */

function closeProductModal() {

    productModal.classList.remove(
        "open"
    );

    productModalOverlay.classList.remove(
        "open"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "product-modal-open"
    );

}


/* =========================================
   OPEN BUTTONS
========================================= */

const openProductButtons =
    document.querySelectorAll(
        ".open-product-button"
    );


openProductButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        button.dataset.productId
                    );


                openProductModal(
                    productId
                );

            }
        );

    }
);


/* =========================================
   CLOSE EVENTS
========================================= */

closeProductModalButton
    .addEventListener(
        "click",
        closeProductModal
    );


productModalOverlay
    .addEventListener(
        "click",
        closeProductModal
    );


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            productModal.classList.contains(
                "open"
            )
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   SELECT SHADE
========================================= */

modalShades.addEventListener(
    "click",
    function (event) {

        const shadeButton =
            event.target.closest(
                ".product-modal-shade"
            );


        if (
            !shadeButton ||
            !currentModalProduct
        ) {
            return;
        }


        const shadeIndex =
            Number(
                shadeButton.dataset
                    .shadeIndex
            );


        const shade =
            currentModalProduct
                .shades[
                    shadeIndex
                ];


        if (!shade) {
            return;
        }


        currentModalShade =
            shade.name;


        const allShadeButtons =
            modalShades.querySelectorAll(
                ".product-modal-shade"
            );


        allShadeButtons.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


        shadeButton.classList.add(
            "selected"
        );


        shadeButton.setAttribute(
            "aria-pressed",
            "true"
        );


        modalSelectedShade.textContent =
            "Selected: " +
            shade.name;


        /*
            FUTURE REAL-LIPS IMAGE

            If lipImage exists for a shade,
            show it.

            Otherwise keep the normal
            product image.
        */

        const nextImage =
            shade.lipImage ||
            currentModalProduct.image;


       const hasLipPreview =
    Boolean(shade.lipImage);


modalImage.classList.add(
    "changing"
);


setTimeout(
    function () {

        modalImage.src =
            nextImage;


        if (hasLipPreview) {

            modalImage.alt =
                currentModalProduct.name +
                " in " +
                shade.name +
                " shown on lips";


            modalPreviewLabel.textContent =
                "ON LIPS · " +
                shade.name.toUpperCase();


            modalPhotoNote.textContent =
                "Shade shown on lips.";

        }
        else {

            modalImage.alt =
                currentModalProduct.name;


            modalPreviewLabel.textContent =
                "PRODUCT PHOTO";


            modalPhotoNote.textContent =
                "Lip preview for " +
                shade.name +
                " will be added soon.";

        }


        modalImage.classList.remove(
            "changing"
        );

    },
    130
);


        setTimeout(
            function () {

                modalImage.src =
                    nextImage;


                modalImage.alt =
                    currentModalProduct.name +
                    " - " +
                    shade.name;


                modalImage.classList.remove(
                    "changing"
                );

            },
            130
        );


        modalAddToCart.disabled =
            false;

        modalBuyNow.disabled =
            false;

    }
);


/* =========================================
   ADD TO CART
========================================= */

modalAddToCart.addEventListener(
    "click",
    function () {

        if (
            !currentModalProduct ||
            !currentModalShade
        ) {
            return;
        }


        addToCart(
            currentModalProduct.id,
            currentModalShade
        );


        closeProductModal();

    }
);


/* =========================================
   BUY NOW
========================================= */

modalBuyNow.addEventListener(
    "click",
    function () {

        if (
            !currentModalProduct ||
            !currentModalShade
        ) {
            return;
        }


        const buyNowItem = {

            productId:
                currentModalProduct.id,

            shade:
                currentModalShade,

            quantity:
                1

        };


        sessionStorage.setItem(
            "buyNowItem",
            JSON.stringify(
                buyNowItem
            )
        );


        sessionStorage.setItem(
            "checkoutMode",
            "buyNow"
        );


        window.location.href =
            "checkout.html";

    }
);