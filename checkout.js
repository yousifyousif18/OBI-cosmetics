/* =========================================================
   OBI CHECKOUT
========================================================= */


const checkoutMode =
    sessionStorage.getItem(
        "checkoutMode"
    );


/* =========================================================
   ELEMENTS
========================================================= */

const checkoutItems =
    document.getElementById(
        "checkout-items"
    );


const checkoutSubtotal =
    document.getElementById(
        "checkout-subtotal"
    );


const checkoutDelivery =
    document.getElementById(
        "checkout-delivery"
    );


const checkoutTotal =
    document.getElementById(
        "checkout-total"
    );


const regionSelect =
    document.getElementById(
        "customer-region"
    );


const cityInput =
    document.getElementById(
        "customer-city"
    );


const checkoutForm =
    document.getElementById(
        "checkout-form"
    );

checkoutForm.addEventListener("input", function (event) {
    if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
});


const marketFlag =
    document.getElementById(
        "checkout-market-flag"
    );


const marketName =
    document.getElementById(
        "checkout-market-name"
    );


const marketCurrency =
    document.getElementById(
        "checkout-market-currency"
    );

/* =========================================================
   MARKET
========================================================= */

const selectedMarketCode =
    getSelectedMarketCode();


if (!selectedMarketCode) {

    window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";

}


const selectedMarket =
    OBI_MARKETS[
        selectedMarketCode
    ];
    if (
    selectedMarket &&
    marketFlag
) {

    marketFlag.src =
        selectedMarket.flag;

    marketFlag.alt =
        selectedMarket.name +
        " flag";
}


if (
    selectedMarket &&
    marketName
) {

    marketName.textContent =
        selectedMarket.name;
}


if (
    selectedMarket &&
    marketCurrency
) {

    marketCurrency.textContent =
        selectedMarket.currency;
}
const deliveryLabel =
    document.getElementById(
        "delivery-option-label"
    );

const cityLabel =
    document.getElementById(
        "city-label"
    );
/* =========================================================
   ORDER DATA
========================================================= */

let orderItems = [];

let subtotal = 0;

let deliveryFee = null;

let selectedRegion = "";



/* =========================================================
   BUY NOW CHECKOUT
========================================================= */

if (
    checkoutMode ===
    "buyNow"
) {

    const buyNowItem =
        readStoredJSON(sessionStorage, "buyNowItem", null);


    if (validateOrderItems([buyNowItem]).length === 0) {

        window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";

    } else {

        orderItems.push(
            buyNowItem
        );

    }

}



/* =========================================================
   CART CHECKOUT
========================================================= */

else if (
    checkoutMode ===
    "cart"
) {

    const cart = getStoredCart();


    if (
        cart.length === 0
    ) {

        alert(
            "Your cart is empty."
        );


        window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";

    } else {

        orderItems =
            cart;

    }

}



/* =========================================================
   INVALID CHECKOUT
========================================================= */

else {

    window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";

}



/* =========================================================
   DISPLAY ORDER
========================================================= */

function displayOrder() {

    checkoutItems.innerHTML =
        "";

    subtotal = 0;


    orderItems.forEach(
        function (item) {

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


            const productPrice =
                getProductNumericPrice(
                    product
                );


            if (
                typeof productPrice
                    !== "number"
            ) {

                return;

            }


            const itemTotal =
                productPrice *
                item.quantity;


            subtotal +=
                itemTotal;


            const shadeText =
                (
                    item.shade &&
                    item.shade !==
                        "Not applicable"
                )

                ?

                `
                    <p>
                        Shade:
                        ${item.shade}
                    </p>
                `

                :

                "";


            checkoutItems.innerHTML += `
                <div class="checkout-item">

                    <h3>
                        ${product.name}
                    </h3>

                    ${shadeText}

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <p>
                        ${formatMoney(
                            productPrice
                        )}
                        each
                    </p>

                    <strong>
                        ${formatMoney(
                            itemTotal
                        )}
                    </strong>

                </div>
            `;

        }
    );


    checkoutSubtotal.textContent =
        formatMoney(
            subtotal
        );


    updateFinalTotal();

}

function populateDeliveryOptions() {

    const delivery =
        getMarketDeliveryData();

    const options =
        getDeliveryOptions();


    if (
        !regionSelect ||
        !delivery
    ) {
        return;
    }


    /* ========================================
       CHANGE LABELS BY DELIVERY TYPE
    ======================================== */

    let placeholderText =
        "Select delivery";


    if (
        delivery.mode === "carrier"
    ) {

        placeholderText =
            "Select delivery option";


        if (deliveryLabel) {

            deliveryLabel.textContent =
                "Delivery Option";

        }


        if (cityLabel) {

            cityLabel.textContent =
                "City";

        }


        if (cityInput) {

            cityInput.placeholder =
                "Enter your city";

        }

    }


    else if (
        delivery.mode === "regions"
    ) {

        placeholderText =
            "Select delivery region";


        if (deliveryLabel) {

            deliveryLabel.textContent =
                "Delivery Region";

        }


        if (cityLabel) {

            cityLabel.textContent =
                "City / Governorate";

        }


        if (cityInput) {

            cityInput.placeholder =
                "Enter your city or governorate";

        }

    }


    else {

        placeholderText =
            "Select delivery";


        if (deliveryLabel) {

            deliveryLabel.textContent =
                "Delivery";

        }


        if (cityLabel) {

            cityLabel.textContent =
                "City";

        }


        if (cityInput) {

            cityInput.placeholder =
                "Enter your city";

        }

    }


    /* ========================================
       CLEAR + CREATE PLACEHOLDER
    ======================================== */

    regionSelect.innerHTML =
        "";


    const placeholder =
        document.createElement(
            "option"
        );


    placeholder.value =
        "";

    placeholder.textContent =
        placeholderText;

    placeholder.disabled =
        true;

    placeholder.selected =
        true;


    regionSelect.appendChild(
        placeholder
    );


    /* ========================================
       ADD DELIVERY OPTIONS
    ======================================== */

    const deliveryGroups = new Map();
    options.forEach(
        function (deliveryOption) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                deliveryOption.name;


            option.textContent =
                deliveryOption.name +
                " — " +
                formatMoney(
                    deliveryOption.fee
                );


            if (selectedMarketCode !== "EGY") {
                regionSelect.appendChild(option);
                return;
            }

            const fee = deliveryOption.fee;
            if (!deliveryGroups.has(fee)) {
                const group = document.createElement("optgroup");
                group.label = formatMoney(fee);
                deliveryGroups.set(fee, group);
                regionSelect.appendChild(group);
            }
            deliveryGroups.get(fee).appendChild(option);

        }
    );


    /*
       Only auto-select when there is
       ONE delivery option.

       Saudi has RedBox + SMSA,
       therefore customer must choose.
    */

    if (
        options.length === 1
    ) {

        selectedRegion =
            options[0].name;


        deliveryFee =
            options[0].fee;


        regionSelect.value =
            selectedRegion;


        updateFinalTotal();

    }

}


/* =========================================================
   DELIVERY REGION CHANGE
========================================================= */

regionSelect.addEventListener(
    "change",
    function () {

        selectedRegion =
            regionSelect.value;


        if (
            !selectedRegion
        ) {

            deliveryFee = null;

            updateFinalTotal();

            return;

        }


        deliveryFee =
            getDeliveryPrice(
                selectedRegion
            );


        updateFinalTotal();

    }
);



/* =========================================================
   TOTAL
========================================================= */

function updateFinalTotal() {

    if (
        typeof deliveryFee
            !== "number"
    ) {

      const delivery =
    getMarketDeliveryData();


checkoutDelivery.textContent =
    delivery &&
    delivery.mode === "carrier"
        ? "Select delivery option"
        : "Select region";

        checkoutTotal.textContent =
            "--";


        return;

    }


    const finalTotal =
        subtotal +
        deliveryFee;


    checkoutDelivery.textContent =
        formatMoney(
            deliveryFee
        );


    checkoutTotal.textContent =
        formatMoney(
            finalTotal
        );

}



/* =========================================================
   WHATSAPP CHECKOUT
========================================================= */

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!selectedMarket || orderItems.length === 0) {
            window.location.href = window.OBILanguage ? window.OBILanguage.url("shop.html") : "shop.html";
            return;
        }

        const requiredFields = ["customer-name", "customer-phone", "customer-city", "customer-address"];
        for (const id of requiredFields) {
            const field = document.getElementById(id);
            field.setCustomValidity(field.value.trim() ? "" : (window.OBILanguage?.t("Please complete this field.") || "Please complete this field."));
            if (!field.reportValidity()) return;
        }


        if (
            !selectedRegion ||
            typeof deliveryFee
                !== "number"
        ) {

           const delivery =
    getMarketDeliveryData();


alert(
    delivery &&
    delivery.mode === "carrier"
        ? "Please select your delivery option."
        : "Please select your delivery region."
);

            return;

        }


        const name =
            document
                .getElementById(
                    "customer-name"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "customer-phone"
                )
                .value
                .trim();


        const city =
            cityInput
                .value
                .trim();


        const address =
            document
                .getElementById(
                    "customer-address"
                )
                .value
                .trim();


        const finalTotal =
            subtotal +
            deliveryFee;


       let orderMessage = "";


orderItems.forEach(
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


        const productPrice =
            getProductNumericPrice(
                product
            );


        if (
            typeof productPrice !==
            "number"
        ) {
            return;
        }


        const itemTotal =
            productPrice *
            item.quantity;


        orderMessage += `
*${index + 1}. ${product.name}*
${(
    item.shade &&
    item.shade !== "Not applicable"
)
    ? `Shade: ${item.shade}\n`
    : ""
}Quantity: ${item.quantity}
Price: ${formatMoney(productPrice)}
Item Total: *${formatMoney(itemTotal)}*

`;

    }
);

const delivery =
    getMarketDeliveryData();


const deliveryFieldName =
    delivery.mode === "carrier"
        ? "Delivery Option"
        : "Delivery Region";


const cityFieldName =
    delivery.mode === "carrier"
        ? "City"
        : "City / Governorate";
    const message = `
*OBI COSMETICS — NEW ORDER*

━━━━━━━━━━━━━━
*ORDER INFORMATION*
━━━━━━━━━━━━━━

*Market:* ${selectedMarket.name}
*Currency:* ${selectedMarket.currency}

━━━━━━━━━━━━━━
*ORDER ITEMS*
━━━━━━━━━━━━━━

${orderMessage}
━━━━━━━━━━━━━━
*ORDER SUMMARY*
━━━━━━━━━━━━━━

Subtotal: *${formatMoney(subtotal)}*
Delivery: *${formatMoney(deliveryFee)}*

*TOTAL: ${formatMoney(finalTotal)}*

━━━━━━━━━━━━━━
*DELIVERY DETAILS*
━━━━━━━━━━━━━━

*${deliveryFieldName}:*
${selectedRegion}

*${cityFieldName}:*
${city}

*Exact Address:*
${address}

━━━━━━━━━━━━━━
*CUSTOMER DETAILS*
━━━━━━━━━━━━━━

*Name:* ${name}
*Phone:* ${phone}

━━━━━━━━━━━━━━

_Please confirm the order and delivery details._
`;


        const whatsappNumber =
            selectedMarket.whatsapp;


        /*
            Saudi Arabia uses
            a different WhatsApp number.

            Until you give me that
            number, Saudi checkout
            will safely stop here.
        */

        if (
            !whatsappNumber
        ) {

            alert(
                "Saudi Arabia WhatsApp checkout is not configured yet."
            );

            return;

        }


        const encodedMessage =
            encodeURIComponent(
                window.OBILanguage ? window.OBILanguage.translateOrderMessage(message) : message
            );


        const whatsappURL =
            (
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodedMessage
            );


        window.location.href =
            whatsappURL;

    }
);



/* =========================================================
   INITIALIZE CHECKOUT
========================================================= */

displayOrder();

populateDeliveryOptions();
