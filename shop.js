/* =========================================
   SHOP ELEMENTS
========================================= */

const productGrid =
    document.getElementById("product-grid");

const shopTitle =
    document.getElementById("shop-title");
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
    urlParameters.get(
        "category"
    );


const selectedProductParameter =
    urlParameters.get(
        "product"
    );


const selectedProductId =
    selectedProductParameter
        ? Number(
            selectedProductParameter
        )
        : null;
/* =========================================
   CATEGORY INFORMATION
========================================= */

const categoryInformation = {

    "lip-gloss": {
        title: "Lip Glosses"
    },

    "lip-oil": {
        title: "Lip Oils"
    },

    "lip-liner": {
        title: "Lip Liners"
    },

    "blush": {
        title: "Blush"
    },

    "liquid-lipstick": {
        title: "Liquid Lipsticks"
    },

    "body-care": {
        title: "Body Care"
    },

    "hair-care": {
        title: "Hair Care"
    }

};

/* =========================================
   RESTORE CATEGORY SECTION POSITION
========================================= */


/* =========================================================
   CATEGORY SCROLL ARROWS
========================================================= */

const categoriesScroll =
    document.getElementById(
        "categories-scroll"
    );

const categoryLeft =
    document.getElementById(
        "category-left"
    );

const categoryRight =
    document.getElementById(
        "category-right"
    );


if (
    categoriesScroll &&
    categoryLeft &&
    categoryRight
) {

    /* =========================================
       SCROLL DISTANCE
    ========================================= */

    function getCategoryScrollAmount() {

        return Math.max(
            220,
            categoriesScroll.clientWidth * 0.55
        );

    }


    /* =========================================
       LEFT ARROW
    ========================================= */

    categoryLeft.addEventListener(
        "click",
        function () {

            categoriesScroll.scrollBy({
                left:
                    -getCategoryScrollAmount(),

                behavior:
                    "smooth"
            });

        }
    );


    /* =========================================
       RIGHT ARROW
    ========================================= */

    categoryRight.addEventListener(
        "click",
        function () {

            categoriesScroll.scrollBy({
                left:
                    getCategoryScrollAmount(),

                behavior:
                    "smooth"
            });

        }
    );


    /* =========================================
       UPDATE ARROW STATES
    ========================================= */

    function updateCategoryArrows() {

        const maxScroll =
            categoriesScroll.scrollWidth -
            categoriesScroll.clientWidth;


        const hasOverflow =
            categoriesScroll.scrollWidth >
            categoriesScroll.clientWidth + 5;


        /*
         If all categories fit on screen,
         hide both arrows.
        */

        if (!hasOverflow) {

            categoryLeft.style.display =
                "none";

            categoryRight.style.display =
                "none";

            return;

        }


        /*
         Otherwise show arrows.
        */

        categoryLeft.style.display =
            "flex";

        categoryRight.style.display =
            "flex";


        /*
         Disable left arrow at beginning.
        */

        categoryLeft.disabled =
            categoriesScroll.scrollLeft <= 5;


        /*
         Disable right arrow at end.
        */

        categoryRight.disabled =
            categoriesScroll.scrollLeft >=
            maxScroll - 5;

    }


    /* =========================================
       UPDATE WHILE SCROLLING
    ========================================= */

    categoriesScroll.addEventListener(
        "scroll",
        updateCategoryArrows
    );


    /* =========================================
       UPDATE WHEN SCREEN SIZE CHANGES
    ========================================= */

    window.addEventListener(
        "resize",
        updateCategoryArrows
    );


    /* =========================================
       INITIAL STATE
    ========================================= */

    updateCategoryArrows();

}
/* =========================================
   FILTER PRODUCTS
========================================= */
/* =========================================
   LIVE CATEGORY FILTERING
========================================= */

const categoryFilters =
    document.querySelectorAll(
        ".obi-shop-filter"
    );


let currentCategory =
    selectedCategory &&
    categoryInformation[selectedCategory]
        ? selectedCategory
        : null;


/* =========================================
   GET PRODUCTS FOR CATEGORY
========================================= */

function getProductsForCategory(
    category
) {

    if (!category) {
        return products;
    }


    return products.filter(
        function (product) {

            return (
                product.category ===
                category
            );

        }
    );

}


/* =========================================
   UPDATE ACTIVE CATEGORY
========================================= */

function updateActiveCategory(
    category
) {

    categoryFilters.forEach(
        function (filter) {

            const filterCategory =
                filter.dataset.category;


            const isActive =
                (
                    !category &&
                    filterCategory === "all"
                )
                ||
                (
                    category ===
                    filterCategory
                );


            filter.classList.toggle(
                "active",
                isActive
            );

        }
    );

}


/* =========================================
   UPDATE SHOP TITLE
========================================= */

function updateShopTitle(
    category
) {

    if (!shopTitle) {
        return;
    }

    if (window.OBIFavourites.onlyFavourites) {
        shopTitle.textContent = "Your Favourites";
        return;
    }


    if (
        category &&
        categoryInformation[category]
    ) {

        shopTitle.textContent =
            categoryInformation[
                category
            ].title;

    }
    else {

        shopTitle.textContent =
            "Shop All";

    }

}


/* =========================================
   UPDATE PRODUCT COUNT
========================================= */

function updateProductCount(
    filteredProducts
) {

    if (!shopResultCount) {
        return;
    }


    const productWord =
        filteredProducts.length === 1
            ? "product"
            : "products";


    shopResultCount.textContent =
        filteredProducts.length +
        " " +
        productWord;

}


/* =========================================
   UPDATE URL WITHOUT RELOAD
========================================= */

function updateCategoryURL(
    category
) {

    const newURL =
        new URL(
            window.location.href
        );


    newURL.searchParams.delete(
        "product"
    );

    if (window.OBIFavourites.onlyFavourites) newURL.searchParams.set("favourites", "1");
    else newURL.searchParams.delete("favourites");


    if (category) {

        newURL.searchParams.set(
            "category",
            category
        );

    }
    else {

        newURL.searchParams.delete(
            "category"
        );

    }


    window.history.pushState(
        {},
        "",
        newURL.pathname +
        newURL.search
    );

}

/* =========================================
   RESULT COUNT
========================================= */



/* =========================================
   PRICE
========================================= */

function getProductPrice(product) {

    const selectedMarket =
        getSelectedMarketCode();


    if (!selectedMarket) {

        return "Select Region";

    }


    const price =
        getProductNumericPrice(
            product
        );


    if (
        typeof price === "number"
    ) {

        return formatMoney(
            price
        );

    }


    return "Unavailable in your delivery country";
}

/* =========================================
   RENDER PRODUCTS
========================================= */
/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(
    filteredProducts
) {

    if (window.OBIFavourites.onlyFavourites) {
        filteredProducts = filteredProducts.flatMap(function (product) {
            if (Array.isArray(product.shades) && product.shades.length) {
                return window.OBIFavourites.savedShades(product.id).map(function (shade) {
                    return { ...product, favouriteShade: shade };
                });
            }
            return window.OBIFavourites.has(product.id) ? [product] : [];
        });
        noProductsMessage.textContent = "No favourites here yet. Save a shade or a product without options using its heart, or switch off Favourites to browse.";
    } else {
        noProductsMessage.textContent = "No products are available in this category.";
    }

    productGrid.innerHTML =
        "";


    if (
        filteredProducts.length === 0
    ) {

        noProductsMessage.hidden =
            false;

        updateProductCount(
            filteredProducts
        );

        return;

    }


    noProductsMessage.hidden =
        true;


    filteredProducts.forEach(
        function (product) {

            const savedShade = product.shades?.find(shade => shade.name === product.favouriteShade);
            const savedShadeAttribute = savedShade ? `data-saved-shade="${window.OBIFavourites.escape(savedShade.name)}"` : "";
            const cardImage = savedShade?.lipImage || savedShade?.image || product.image;


            const hasShades =
                Array.isArray(
                    product.shades
                ) &&
                product.shades.length > 0;


            const optionText =
                savedShade ? savedShade.name : hasShades
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
                savedShade ? "View Saved Shade" : hasShades
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
                        ${savedShadeAttribute}
                        aria-label="View ${product.name}"
                    >

                        <div class="obi-product-image">

                            <img
                                src="${cardImage}"
                                alt="${product.name}${savedShade ? " — " + savedShade.name : ""}"
                                loading="lazy"
                            >

                        </div>


                        <span
                            class="obi-product-option-count"
                        >
                            ${optionText}
                        </span>

                    </button>


                    <div class="obi-product-info">

                        ${window.OBIFavourites.onlyFavourites ? "" : window.OBIFavourites.summary(product)}
                        ${savedShade ? `<p class="saved-favourite-shade-name">${window.OBIFavourites.escape(savedShade.name)}</p>` : ""}

                        <div class="obi-product-heading">

                            <h2>
                                ${product.name}
                            </h2>

                            <p class="obi-product-price">
                                ${getProductPrice(product)}
                            </p>

                        </div>


                        ${
                            product.tagline
                                ? `
                                    <p class="obi-product-tagline">
                                        ${product.tagline}
                                    </p>
                                `
                                : ""
                        }


                        <p class="obi-product-description">
                            ${product.description}
                        </p>


                        <button
                            class="obi-product-open open-product-button"
                            type="button"
                            data-product-id="${product.id}"
                            ${savedShadeAttribute}
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


    updateProductCount(
        filteredProducts
    );

}


/* =========================================
   APPLY CATEGORY
========================================= */

function applyCategory(
    category,
    updateURL = true
) {

    currentCategory =
        category;


    const filteredProducts =
        getProductsForCategory(
            category
        );


    updateShopTitle(
        category
    );


    updateActiveCategory(
        category
    );


    renderProducts(
        filteredProducts
    );


    if (updateURL) {

        updateCategoryURL(
            category
        );

    }

}


/* =========================================
   CATEGORY CLICK EVENTS
========================================= */

categoryFilters.forEach(
    function (filter) {

        filter.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const selectedFilter =
                    filter.dataset.category;


                const resetFilters = selectedFilter === "all" || selectedFilter === currentCategory;
                const category =
                    resetFilters
                        ? null
                        : selectedFilter;

                if (resetFilters) {
                    window.OBIFavourites.onlyFavourites = false;
                    favouritesToggle.setAttribute("aria-pressed", "false");
                }


                applyCategory(
                    category,
                    true
                );

            }
        );

    }
);


/* =========================================
   INITIAL SHOP RENDER
========================================= */

applyCategory(
    currentCategory,
    false
);

/* =========================================
   PRODUCT MODAL ELEMENTS
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
const modalGallery =
    document.getElementById(
        "product-modal-gallery"
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

const modalTagline =
    document.getElementById(
        "product-modal-tagline"
    );

const modalBenefitsSection =
    document.getElementById(
        "product-modal-benefits-section"
    );

const modalBenefits =
    document.getElementById(
        "product-modal-benefits"
    );

const modalUsageSection =
    document.getElementById(
        "product-modal-usage-section"
    );

const modalUsage =
    document.getElementById(
        "product-modal-usage"
    );

const modalSpecsSection =
    document.getElementById(
        "product-modal-specs-section"
    );


const modalNetWeight =
    document.getElementById(
        "product-modal-net-weight"
    );
/* =========================================
   SHADE ARROWS
========================================= */

const shadeScrollPrev =
    document.getElementById(
        "shade-scroll-prev"
    );

const shadeScrollNext =
    document.getElementById(
        "shade-scroll-next"
    );


/* =========================================
   CURRENT PRODUCT
========================================= */

let currentModalProduct =
    null;

let currentModalShade =
    null;

let shadeRowHasNudged =
    false;


/* =========================================
   SHADE ARROW STATE
========================================= */

function updateShadeScrollButtons() {

    if (
        !modalShades ||
        !shadeScrollPrev ||
        !shadeScrollNext
    ) {

        return;

    }


    const maxScroll =
        modalShades.scrollWidth -
        modalShades.clientWidth;


    const hasOverflow =
        maxScroll > 5;


    shadeScrollPrev.hidden =
        !hasOverflow;

    shadeScrollNext.hidden =
        !hasOverflow;


    if (!hasOverflow) {

        return;

    }


    shadeScrollPrev.disabled =
        modalShades.scrollLeft <= 5;


    shadeScrollNext.disabled =
        modalShades.scrollLeft >=
        maxScroll - 5;

}


/* =========================================
   SHADE ARROW EVENTS
========================================= */

if (
    shadeScrollPrev &&
    shadeScrollNext
) {

    shadeScrollPrev.addEventListener(
        "click",
        function () {

            modalShades.scrollBy({
                left: -260,
                behavior: "smooth"
            });

        }
    );


    shadeScrollNext.addEventListener(
        "click",
        function () {

            modalShades.scrollBy({
                left: 260,
                behavior: "smooth"
            });

        }
    );


    modalShades.addEventListener(
        "scroll",
        updateShadeScrollButtons
    );

}

/* =========================================
   PRODUCT IMAGE GALLERY
========================================= */

function renderProductGallery(
    product
) {

    if (!modalGallery) {

        return;
    }


    const gallery =
        Array.isArray(
            product.gallery
        )
            ? product.gallery
            : [];


    modalGallery.innerHTML =
        "";


    /*
        Do not show gallery controls
        for products with only one image.
    */

    if (
        gallery.length <= 1
    ) {

        modalGallery.hidden =
            true;

        return;
    }


    modalGallery.hidden =
        false;


    gallery.forEach(
        function (
            galleryImage,
            index
        ) {

            modalGallery.innerHTML += `
                <button
                    class="
                        product-modal-gallery-thumb
                        ${index === 0 ? "active" : ""}
                    "
                    type="button"
                    data-gallery-index="${index}"
                    aria-label="View ${galleryImage.label || "product image"}"
                >

                    <img
                        src="${galleryImage.src}"
                        alt="${galleryImage.alt || product.name}"
                    >

                    <span>
                        ${galleryImage.label || "Photo"}
                    </span>

                </button>
            `;

        }
    );

}
/* =========================================
   OPEN PRODUCT MODAL
========================================= */

function getAvailableProductMarkets(product) {
    return Object.keys(OBI_MARKETS).filter(function (code) {
        return Number.isFinite(product.prices?.[code]) && product.prices[code] > 0;
    });
}

function updateProductPurchaseActions() {
    if (!currentModalProduct) return;

    const market = getSelectedMarketCode();
    const availableMarkets = getAvailableProductMarkets(currentModalProduct);
    const canPurchase = availableMarkets.includes(market);

    modalPrice.textContent = getProductPrice(currentModalProduct);
    productModal.classList.toggle("product-modal--unavailable", Boolean(market) && !canPurchase);
    modalAddToCart.hidden = !canPurchase;
    modalAddToCart.disabled = !canPurchase || !currentModalShade;
    modalBuyNow.disabled = canPurchase ? !currentModalShade : Boolean(market && !availableMarkets.length);
    modalBuyNow.textContent = canPurchase ? "Buy Now" : !market ? "Choose Delivery Country" :
        availableMarkets.length ? "See Available Countries" : "Unavailable";
}

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

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    currentModalProduct =
        product;

    document.getElementById("product-favourite-action").innerHTML = window.OBIFavourites.button(product);
    document.getElementById("product-favourite-action").classList.toggle("has-options", Boolean(product.shades?.length));

    const customerReviews = document.getElementById("product-customer-reviews");
    if (customerReviews) {
        const reviewFiles = product.id === 1
            ? ["gloss-texture-scent", "gloss-value-feedback", "gloss-shades-feedback"]
            : product.id === 11 ? ["hair-oil-feedback"] : [];
        customerReviews.hidden = reviewFiles.length === 0;
        customerReviews.innerHTML = reviewFiles.length ? `
            <h3>Customer love</h3>
            <p>${product.id === 11 ? "One customer's personal hair oil experience. Individual results vary." : "Customer feedback on gloss texture, scent and shades."} Tap a screenshot to read it in full.</p>
            <div class="product-review-thumbnails">${reviewFiles.map(function (file) {
                return `<a href="images/reviews/${file}.jpeg" target="_blank" rel="noopener" aria-label="Open customer review"><img src="images/reviews/${file}.jpeg" alt="Customer feedback about ${product.name}" loading="lazy"></a>`;
            }).join("")}</div>
            <a href="obi-love.html#${product.id === 11 ? "hair-oil-love" : "customer-love"}">More OBI Love &rarr;</a>
        ` : "";
    }

    currentModalShade =
        null;


    /* =========================================
       BASIC PRODUCT INFORMATION
    ========================================= */

    modalTitle.textContent =
        product.name;


    modalPrice.textContent =
        getProductPrice(product);


    modalDescription.textContent =
        product.description;


    modalImage.src =
        product.image;


    modalImage.alt =
        product.name;
renderProductGallery(
    product
);

    modalPreviewLabel.textContent =
        "PRODUCT PHOTO";


    modalPhotoNote.textContent =
        "Product shown for reference.";
if (product.netWeight) {

    modalNetWeight.textContent =
        "Net Weight: " +
        product.netWeight;


    modalSpecsSection.hidden =
        false;

}
else {

    modalNetWeight.textContent =
        "";


    modalSpecsSection.hidden =
        true;

}

    /* =========================================
       TAGLINE
    ========================================= */

    if (product.tagline) {

        modalTagline.textContent =
            product.tagline;

        modalTagline.hidden =
            false;

    }
    else {

        modalTagline.textContent =
            "";

        modalTagline.hidden =
            true;

    }


    /* =========================================
       BENEFITS
    ========================================= */

    if (
        Array.isArray(
            product.benefits
        ) &&
        product.benefits.length > 0
    ) {

        modalBenefits.innerHTML =
            product.benefits
                .map(
                    function (benefit) {

                        return `
                            <li>
                                ${benefit}
                            </li>
                        `;

                    }
                )
                .join("");


        modalBenefitsSection.hidden =
            false;

    }
    else {

        modalBenefits.innerHTML =
            "";

        modalBenefitsSection.hidden =
            true;

    }


    /* =========================================
       HOW TO USE
    ========================================= */

    if (product.usage) {

        modalUsage.textContent =
            product.usage;

        modalUsageSection.hidden =
            false;

    }
    else {

        modalUsage.textContent =
            "";

        modalUsageSection.hidden =
            true;

    }


    /* =========================================
       PRODUCT OPTIONS
    ========================================= */

    const hasShades =
        Array.isArray(
            product.shades
        ) &&
        product.shades.length > 0;


    /* =========================================
       PRODUCT HAS SHADES
    ========================================= */

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


        modalShades.scrollLeft =
            0;


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


    }


    /* =========================================
       PRODUCT HAS NO SHADES
    ========================================= */

    else {

        modalShadeSection.hidden =
            true;


        currentModalShade =
            "Not applicable";


        if (shadeScrollPrev) {

            shadeScrollPrev.hidden =
                true;

        }


        if (shadeScrollNext) {

            shadeScrollNext.hidden =
                true;

        }

    }


    updateProductPurchaseActions();

    /* =========================================
       OPEN MODAL
    ========================================= */

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


    document.documentElement.classList.add(
    "product-modal-open"
);

document.body.classList.add(
    "product-modal-open"
);

    productModal.scrollTo({ top: 0, behavior: "instant" });

    /* =========================================
       SHADE INTRO ANIMATION
    ========================================= */

    if (hasShades) {

        setTimeout(
            function () {

                updateShadeScrollButtons();


                const hasOverflow =
                    modalShades.scrollWidth >
                    modalShades.clientWidth;


                if (
                    hasOverflow &&
                    !shadeRowHasNudged
                ) {

                    shadeRowHasNudged =
                        true;


                    /*
                        Move a little to the right
                        so the customer sees that
                        more shades are available.
                    */

                    modalShades.scrollTo({
                        left: 75,
                        behavior: "smooth"
                    });


                    /*
                        Then return to the start.
                    */

                    setTimeout(
                        function () {

                            modalShades.scrollTo({
                                left: 0,
                                behavior: "smooth"
                            });

                        },
                        500
                    );

                }

            },
            250
        );

    }

}


/* =========================================
   CLOSE PRODUCT MODAL
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


    document.documentElement.classList.remove(
        "product-modal-open"
    );


    document.body.classList.remove(
        "product-modal-open"
    );

}
/* =========================================
   OPEN PRODUCT BUTTONS
   EVENT DELEGATION
========================================= */

productGrid.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".open-product-button"
            );


        if (!button) {
            return;
        }


        const productId =
            Number(
                button.dataset.productId
            );


        openProductModal(
            productId
        );

        if (button.dataset.savedShade) {
            const index = currentModalProduct.shades.findIndex(shade => shade.name === button.dataset.savedShade);
            modalShades.querySelector(`[data-shade-index="${index}"]`)?.click();
        }

    }
);
/* =========================================
   PRODUCT GALLERY CLICK
========================================= */

if (modalGallery) {

    modalGallery.addEventListener(
        "click",
        function (event) {

            const galleryButton =
                event.target.closest(
                    ".product-modal-gallery-thumb"
                );


            if (
                !galleryButton ||
                !currentModalProduct
            ) {

                return;
            }


            const gallery =
                Array.isArray(
                    currentModalProduct.gallery
                )
                    ? currentModalProduct.gallery
                    : [];


            const galleryIndex =
                Number(
                    galleryButton.dataset
                        .galleryIndex
                );


            const galleryImage =
                gallery[
                    galleryIndex
                ];


            if (!galleryImage) {

                return;
            }


            /* Remove old active thumbnail */

            const galleryButtons =
                modalGallery.querySelectorAll(
                    ".product-modal-gallery-thumb"
                );


            galleryButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            /* Activate selected thumbnail */

            galleryButton.classList.add(
                "active"
            );


            /* Animate main image */

            modalImage.classList.add(
                "changing"
            );


            setTimeout(
                function () {

                    modalImage.src =
                        galleryImage.src;


                    modalImage.alt =
                        galleryImage.alt ||
                        currentModalProduct.name;


                    modalPreviewLabel.textContent =
                        (
                            galleryImage.label ||
                            "Product Photo"
                        ).toUpperCase();


                    if (
                        galleryImage.label ===
                        "Texture"
                    ) {

                        modalPhotoNote.textContent =
                            "A closer look at the product texture.";

                    }
                    else if (
                        galleryImage.label ===
                        "On Skin"
                    ) {

                        modalPhotoNote.textContent =
                            "See how the product looks during application.";

                    }
                    else if (
                        galleryImage.label ===
                        "Lifestyle"
                    ) {

                        modalPhotoNote.textContent =
                            "Obi Body Care collection.";

                    }
                    else {

                        modalPhotoNote.textContent =
                            "Product shown for reference.";

                    }


                    modalImage.classList.remove(
                        "changing"
                    );

                },
                130
            );

        }
    );

}
/* =========================================
   CLOSE EVENTS
========================================= */

closeProductModalButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        event.stopPropagation();

        closeProductModal();

    }
);




if (productModalOverlay) {

    productModalOverlay
        .addEventListener(
            "click",
            closeProductModal
        );

}


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

        document.getElementById("product-favourite-action").innerHTML = window.OBIFavourites.button(currentModalProduct, "selected-shade-favourite", shade.name);


        /* Remove previous selection */

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


        /* Select current shade */

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


        /* =========================================
           SHADE IMAGE
        ========================================= */

        const nextImage =
            shade.lipImage ||
            currentModalProduct.image;


        const hasLipPreview =
            Boolean(
                shade.lipImage
            );


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
                        " shown for reference";


                    modalPreviewLabel.textContent =
                        "SHADE PREVIEW · " +
                        shade.name.toUpperCase();


                    modalPhotoNote.textContent =
                        "Shade shown for reference.";

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


        updateProductPurchaseActions();

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


        if (
            typeof getProductNumericPrice(currentModalProduct) !== "number"
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
        if (!currentModalProduct) return;

        const market = getSelectedMarketCode();
        const availableMarkets = getAvailableProductMarkets(currentModalProduct);
        if (!market || !availableMarkets.includes(market)) {
            const choices = market ? availableMarkets : undefined;
            if (!choices || choices.length) openPurchaseMarketPicker(choices);
            return;
        }
        if (!currentModalShade) return;

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


        window.location.href = window.OBILanguage ? window.OBILanguage.url("checkout.html") : "checkout.html";

    }
);
/* =========================================
   PRODUCT DETAILS ACCORDION
========================================= */

const productDetailsToggle =
    document.getElementById(
        "product-details-toggle"
    );


const productDetailsContent =
    document.getElementById(
        "product-details-content"
    );


if (
    productDetailsToggle &&
    productDetailsContent
) {

    productDetailsToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                productDetailsToggle
                    .getAttribute(
                        "aria-expanded"
                    ) === "true";


            productDetailsToggle
                .setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


            productDetailsContent.hidden =
                isOpen;

        }
    );

}
/* =========================================
   OPEN PRODUCT FROM CART URL
   MUST STAY AT BOTTOM OF SHOP.JS
========================================= */

function openProductFromURL() {

    if (
        !selectedProductId ||
        !Number.isFinite(
            selectedProductId
        )
    ) {
        return;
    }


    const selectedProduct =
        products.find(
            function (product) {

                return (
                    product.id ===
                    selectedProductId
                );

            }
        );


    if (!selectedProduct) {
        return;
    }


    /* Remove product parameter first */

    const cleanURL =
        new URL(
            window.location.href
        );


    cleanURL.searchParams.delete(
        "product"
    );


    window.history.replaceState(
        {},
        "",
        cleanURL.pathname +
        cleanURL.search +
        cleanURL.hash
    );


    /* Then open the product */

    openProductModal(
        selectedProductId
    );

}


/* Run only after all shop.js
   controls have been connected */

openProductFromURL();

const favouritesToggle = document.getElementById("shop-favourites-toggle");
function syncFavouritesView() {
    favouritesToggle.setAttribute("aria-pressed", String(window.OBIFavourites.onlyFavourites));
    if (window.OBIFavourites.onlyFavourites) {
        const focused = document.activeElement;
        applyCategory(currentCategory, false);
        if (focused?.matches("[data-favourite-id]") && !focused.isConnected) favouritesToggle.focus({ preventScroll: true });
    }
}
favouritesToggle.addEventListener("click", function () {
    window.OBIFavourites.onlyFavourites = !window.OBIFavourites.onlyFavourites;
    favouritesToggle.setAttribute("aria-pressed", String(window.OBIFavourites.onlyFavourites));
    applyCategory(window.OBIFavourites.onlyFavourites ? currentCategory : null, true);
});
document.addEventListener("obi:favourites-changed", syncFavouritesView);
syncFavouritesView();
