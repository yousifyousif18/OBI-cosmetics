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

        code: "EGY",

        name: "Egypt",

        flag: "🇪🇬",

        currency: "EGP",

        locale: "en-EG",


        /*
            Egypt, UAE and Qatar
            use the same WhatsApp number.
        */

        whatsapp:
            "601169390811",


        delivery: {

            mode: "regions",

            options: [

                {
                    name:
                        "Cairo (including Giza)",

                    fee: 75
                },

                {
                    name:
                        "Other Governorates",

                    fee: 100
                }

            ]

        }

    },



    UAE: {

        code: "UAE",

        name:
            "United Arab Emirates",

        flag: "🇦🇪",

        currency: "AED",

        locale: "en-AE",

        whatsapp:
            "601169390811",


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

        flag: "🇸🇦",

        currency: "SAR",

        locale: "en-SA",


        /*
            ADD THE SAUDI WHATSAPP
            NUMBER HERE LATER.
        */

        whatsapp: "249966579441",


        /*
            TEMPORARY TEST DELIVERY FEE.

            Replace this when the real
            Saudi delivery price is confirmed.
        */

        delivery: {

            mode: "flat",

            temporary: true,

            options: [

                {
                    name:
                        "Saudi Arabia",

                    fee: 30
                }

            ]

        }

    },



    QAT: {

        code: "QAT",

        name: "Qatar",

        flag: "🇶🇦",

        currency: "QAR",

        locale: "en-QA",

        whatsapp:
            "601169390811",


        delivery: {

            mode: "flat",

            options: [

                {
                    name:
                        "Qatar",

                    fee: 25
                }

            ]

        }

    }

};

/* =========================================================
   SELECTED MARKET
========================================================= */

const OBI_MARKET_STORAGE_KEY =
    "obiSelectedMarket";


function getSelectedMarketCode() {

    const savedMarket =
        localStorage.getItem(
            OBI_MARKET_STORAGE_KEY
        );


    if (
        savedMarket &&
        OBI_MARKETS[savedMarket]
    ) {

        return savedMarket;

    }


    return "EGY";
}


function getSelectedMarket() {

    return OBI_MARKETS[
        getSelectedMarketCode()
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


    localStorage.setItem(
        OBI_MARKET_STORAGE_KEY,
        marketCode
    );

}


/* =========================================================
   PRICE HELPERS
========================================================= */

function getProductNumericPrice(product) {

    const marketCode =
        getSelectedMarketCode();


    if (
        !product ||
        !product.prices ||
        typeof product.prices[marketCode] !== "number"
    ) {

        return null;
    }


    return product.prices[
        marketCode
    ];

}


function formatMoney(
    amount
) {

    const market =
        getSelectedMarket();


    return new Intl.NumberFormat(
        market.locale,
        {
            style: "currency",
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

    return getSelectedMarket()
        .delivery;

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

    return (
        "cart_" +
        getSelectedMarketCode()
    );

}


/* =========================================================
   MIGRATE EXISTING OLD CART TO EGYPT
========================================================= */

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const selector =
            document.getElementById(
                "market-selector"
            );


        const selectorButton =
            document.getElementById(
                "market-selector-button"
            );


        const selectorMenu =
            document.getElementById(
                "market-selector-menu"
            );


        const currentFlag =
            document.getElementById(
                "market-current-flag"
            );


        const currentCurrency =
            document.getElementById(
                "market-current-currency"
            );


        if (
            !selector ||
            !selectorButton ||
            !selectorMenu
        ) {

            return;
        }


        const market =
            getSelectedMarket();


        if (currentFlag) {

            currentFlag.textContent =
                market.flag;

        }


        if (currentCurrency) {

            currentCurrency.textContent =
                market.currency;

        }


        selectorButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                selector.classList.toggle(
                    "open"
                );

            }
        );


        const marketButtons =
            selectorMenu.querySelectorAll(
                "[data-market]"
            );


        marketButtons.forEach(
            function (button) {

                const buttonMarket =
                    button.dataset.market;


                if (
                    buttonMarket ===
                    getSelectedMarketCode()
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function () {

                        const newMarket =
                            button.dataset.market;


                        if (
                            newMarket ===
                            getSelectedMarketCode()
                        ) {

                            selector.classList.remove(
                                "open"
                            );

                            return;

                        }


                        setSelectedMarket(
                            newMarket
                        );


                        /*
                           Reload intentionally.

                           This refreshes:
                           - prices
                           - cart
                           - currency
                           - delivery market
                        */

                        window.location.reload();

                    }
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !selector.contains(
                        event.target
                    )
                ) {

                    selector.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);