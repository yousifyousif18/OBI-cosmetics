/* =========================================================
   OBI COSMETICS
   MARKET / COUNTRY SYSTEM

   NOTE:
   ALL PRICES AND DELIVERY FEES BELOW ARE TEMPORARY
   UNTIL FINAL BUSINESS PRICES ARE CONFIRMED.
========================================================= */


/* =========================================================
   MARKET INFORMATION
========================================================= */

const OBI_MARKETS = {

   EGY: {

    code:
        "EGY",

    name:
        "Egypt",

    flag:
        "images/flags/egypt.webp",

    currency:
        "EGP",

    locale:
        "en-EG",

    whatsapp:
        "201515630587",

    delivery: {

        mode:
            "regions",

        options: [

            {
                name:
                    "Cairo (including Giza)",

                fee:
                    75
            },

            {
                name:
                    "Other Governorates",

                fee:
                    100
            }

        ]

    }

},



    UAE: {

    code: "UAE",

    name:
        "United Arab Emirates",

    flag:
        "images/flags/uae.webp",

    currency: "AED",

    locale: "en-AE",

    whatsapp:
        "201515630587",

    delivery: {

        mode: "flat",

        options: [

            {
                name:
                    "United Arab Emirates",

                fee: 30
            }

        ]

    }

},



   KSA: {

    code: "KSA",

    name:
        "Saudi Arabia",

    flag:
        "images/flags/ksa.webp",

    currency:
        "SAR",

    locale:
        "en-SA",

    whatsapp:
        "201023536726",

    delivery: {

        mode:
            "carrier",

        options: [

            {
                name:
                    "RedBox",

                fee:
                    20
            },

            {
                name:
                    "SMSA",

                fee:
                    35
            }

        ]

    }

},



    QAT: {

    code:
        "QAT",

    name:
        "Qatar",

    flag:
        "images/flags/qatar.webp",

    currency:
        "QAR",

    locale:
        "en-QA",

    whatsapp:
        "201515630587",

    delivery: {

        mode:
            "flat",

        options: [

            {
                name:
                    "Qatar",

                fee:
                    25
            }

        ]

    }

}

};

/* =========================================================
   SELECTED MARKET
========================================================= */
/* =========================================================
   SELECTED MARKET
========================================================= */

const OBI_MARKET_STORAGE_KEY =
    "obiSelectedMarket";


function getSelectedMarketCode() {

    const savedMarket =
        sessionStorage.getItem(
            "obiSelectedMarket"
        );


    if (
        savedMarket &&
        OBI_MARKETS[savedMarket]
    ) {

        return savedMarket;

    }


    return null;
}


function getSelectedMarket() {

    const marketCode =
        getSelectedMarketCode();


    if (!marketCode) {

        return null;

    }


    return OBI_MARKETS[
        marketCode
    ];

}


function setSelectedMarket(
    marketCode
) {

    if (
        !OBI_MARKETS[marketCode]
    ) {
        return;
    }


    sessionStorage.setItem(
        "obiSelectedMarket",
        marketCode
    );
}



/* =========================================================
   PRICE HELPERS
========================================================= */

function getProductNumericPrice(
    product
) {

    const marketCode =
        getSelectedMarketCode();


    if (!marketCode) {

        return null;

    }


    if (
        !product ||
        !product.prices
    ) {

        return null;

    }


    const price =
        product.prices[
            marketCode
        ];


    if (
        typeof price !== "number"
    ) {

        return null;

    }


    return price;

}



function formatMoney(
    amount
) {

    const market =
        getSelectedMarket();


    /*
        If no region has been selected,
        return a plain number.
    */

    if (!market) {

        return String(
            amount
        );

    }


    return new Intl.NumberFormat(
        market.locale,
        {
            style:
                "currency",

            currency:
                market.currency,

            currencyDisplay:
                "code",

            maximumFractionDigits:
                0
        }
    ).format(
        amount
    );

}



/* =========================================================
   DELIVERY HELPERS
========================================================= */

function getMarketDeliveryData() {

    const market =
        getSelectedMarket();


    if (!market) {

        return null;

    }


    return market.delivery;

}


function getDeliveryOptions() {

    const delivery =
        getMarketDeliveryData();


    if (
        !delivery ||
        !Array.isArray(
            delivery.options
        )
    ) {

        return [];

    }


    return delivery.options;

}


function getDeliveryPrice(
    regionName
) {

    const options =
        getDeliveryOptions();


    const selectedOption =
        options.find(
            function (option) {

                return (
                    option.name ===
                    regionName
                );

            }
        );


    if (
        !selectedOption ||
        typeof selectedOption.fee
            !== "number"
    ) {

        return null;

    }


    return selectedOption.fee;

}



/* =========================================================
   MARKET-SPECIFIC CART
========================================================= */

function getCartStorageKey() {

    const marketCode =
        getSelectedMarketCode();


    /*
        Before a region is chosen,
        use a temporary empty-cart key.
    */

    if (!marketCode) {

        return "cart_unselected";

    }


    return (
        "cart_" +
        marketCode
    );

}
/* =========================================================
   MIGRATE EXISTING OLD CART TO EGYPT
========================================================= */

function readStoredJSON(storage, key, fallback) {
    try {
        const value = storage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (_) {
        return fallback;
    }
}

function validateOrderItems(items) {
    if (!Array.isArray(items)) return [];
    return items.filter(function (item) {
        if (!item || !Number.isSafeInteger(item.quantity) || item.quantity < 1) return false;
        const product = products.find(function (product) { return product.id === item.productId; });
        if (!product) return false;
        const price = getProductNumericPrice(product);
        if (!Number.isFinite(price) || price <= 0) return false;
        return !Array.isArray(product.shades) || product.shades.length === 0 ||
            product.shades.some(function (shade) { return shade.name === item.shade; });
    }).map(function (item) {
        const product = products.find(function (product) { return product.id === item.productId; });
        return {
            productId: item.productId,
            quantity: item.quantity,
            shade: product.shades && product.shades.length ? item.shade : "Not applicable"
        };
    });
}

function getStoredCart() {
    return validateOrderItems(readStoredJSON(localStorage, getCartStorageKey(), []));
}

/*
   This keeps the cart you already had
   before introducing countries.
*/

function migrateLegacyCart() {

    const oldCart =
        localStorage.getItem(
            "cart"
        );


    const egyptCart =
        localStorage.getItem(
            "cart_EGY"
        );


    if (
        oldCart &&
        !egyptCart
    ) {

        localStorage.setItem(
            "cart_EGY",
            oldCart
        );

    }

}


migrateLegacyCart();


/* =========================================================
   COUNTRY SELECTOR
========================================================= */

/* =========================================
   MARKET SELECTOR
========================================= */

const marketSelector =
    document.getElementById(
        "market-selector"
    );

const marketSelectorButton =
    document.getElementById(
        "market-selector-button"
    );

const marketSelectorMenu =
    document.getElementById(
        "market-selector-menu"
    );

const marketCurrentFlag =
    document.getElementById(
        "market-current-flag"
    );

const marketCurrentCurrency =
    document.getElementById(
        "market-current-currency"
    );

const marketOptions =
    document.querySelectorAll(
        "#market-selector-menu [data-market]"
    );


/* =========================================
   MARKET DISPLAY DATA
========================================= */

const marketDisplay = {

    EGY: {
        flag: "images/flags/egypt.webp",
        currency: "EGP"
    },

    UAE: {
        flag: "images/flags/uae.webp",
        currency: "AED"
    },

    KSA: {
        flag: "images/flags/ksa.webp",
        currency: "SAR"
    },

    QAT: {
        flag: "images/flags/qatar.webp",
        currency: "QAR"
    }

};

/* =========================================
   UPDATE SELECTOR DISPLAY
========================================= */

function updateMarketSelectorDisplay() {

    if (
        !marketSelector ||
        !marketCurrentFlag ||
        !marketCurrentCurrency
    ) {
        return;
    }


   const selectedMarket =
    getSelectedMarketCode();


    /* NO REGION SELECTED */

    if (
    !selectedMarket ||
    !marketDisplay[selectedMarket]
) {

    marketCurrentFlag.src =
        "images/flags/globe.webp";

    marketCurrentFlag.alt =
        "";

    marketCurrentCurrency.textContent =
        "Select Region";

    marketSelector.classList.add(
        "needs-selection"
    );

    marketOptions.forEach(
        function (option) {

            option.classList.remove(
                "active"
            );

        }
    );

    return;
}


    /* REGION HAS BEEN SELECTED */

    const market =
    marketDisplay[selectedMarket];

marketCurrentFlag.src =
    market.flag;

marketCurrentFlag.alt =
    "";

marketCurrentCurrency.textContent =
    market.currency;

marketSelector.classList.remove(
    "needs-selection"
);


    marketOptions.forEach(
        function (option) {

            option.classList.toggle(
                "active",
                option.dataset.market ===
                selectedMarket
            );

        }
    );

}


/* =========================================
   OPEN / CLOSE SELECTOR
========================================= */

if (
    marketSelector &&
    marketSelectorButton
) {

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape" || !marketSelector.classList.contains("open")) return;
        event.preventDefault();
        marketSelector.classList.remove("open");
        marketSelectorButton.setAttribute("aria-expanded", "false");
        document.querySelector("header")?.classList.remove("header-locked");
        marketSelectorButton.focus({ preventScroll: true });
    });

    marketSelectorButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const isOpen =
                marketSelector.classList.toggle(
                    "open"
                );
const header =
    document.querySelector(
        "header"
    );


if (
    marketSelector.classList.contains(
        "open"
    )
) {

    header?.classList.add(
        "header-locked"
    );

}
else {

    header?.classList.remove(
        "header-locked"
    );

}

            marketSelectorButton.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================
   SELECT REGION
========================================= */

marketOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const selectedMarket =
                    option.dataset.market;


                if (
                    !marketDisplay[
                        selectedMarket
                    ]
                ) {
                    return;
                }

setSelectedMarket(
    selectedMarket
);

                updateMarketSelectorDisplay();


                if (marketSelector) {

                    marketSelector.classList.remove(
                        "open"
                    );
document
    .querySelector(
        "header"
    )
    ?.classList.remove(
        "header-locked"
    );
                }


                if (marketSelectorButton) {

                    marketSelectorButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


            /* Update shop without reloading */

if (
    typeof applyCategory === "function"
) {
    applyCategory(
        currentCategory,
        false
    );
}


if (
    typeof renderCart === "function"
) {
    cart = getStoredCart();
    renderCart();
    updateCartCount();
}

            }
        );

    }
);


/* =========================================
   CLICK OUTSIDE TO CLOSE
========================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!marketSelector) {
            return;
        }


        if (
            marketSelector.classList.contains("open") &&
            !marketSelector.contains(
                event.target
            )
        ) {

            event.preventDefault();
            event.stopImmediatePropagation();

            marketSelector.classList.remove(
                "open"
            );
document
    .querySelector(
        "header"
    )
    ?.classList.remove(
        "header-locked"
    );

            if (marketSelectorButton) {

                marketSelectorButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    },
    { capture: true }
);


/* =========================================
   INITIAL DISPLAY
========================================= */

updateMarketSelectorDisplay();
