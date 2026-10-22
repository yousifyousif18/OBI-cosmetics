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


const selectedMarket =
    getSelectedMarket();


if (marketFlag) {

    marketFlag.textContent =
        selectedMarket.flag;

}


if (marketName) {

    marketName.textContent =
        selectedMarket.name;

}


if (marketCurrency) {

    marketCurrency.textContent =
        selectedMarket.currency;

}



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
        JSON.parse(
            sessionStorage.getItem(
                "buyNowItem"
            )
        );


    if (!buyNowItem) {

        window.location.href =
            "shop.html";

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

    const cart =
        JSON.parse(
            localStorage.getItem(
                getCartStorageKey()
            )
        ) || [];


    if (
        cart.length === 0
    ) {

        alert(
            "Your cart is empty."
        );


        window.location.href =
            "shop.html";

    } else {

        orderItems =
            cart;

    }

}



/* =========================================================
   INVALID CHECKOUT
========================================================= */

else {

    window.location.href =
        "shop.html";

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



/* =========================================================
   DELIVERY OPTIONS
========================================================= */

function populateDeliveryOptions() {

    const options =
        getDeliveryOptions();


    regionSelect.innerHTML = `
        <option value="">
            Select delivery region
        </option>
    `;


    options.forEach(
        function (deliveryOption) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                deliveryOption.name;


            option.textContent =
                (
                    deliveryOption.name +
                    " — " +
                    formatMoney(
                        deliveryOption.fee
                    )
                );


            regionSelect.appendChild(
                option
            );

        }
    );


    /*
        UAE / Qatar / Saudi currently
        have only one delivery option.

        Select it automatically.
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

        checkoutDelivery.textContent =
            "Select region";


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


        if (
            !selectedRegion ||
            typeof deliveryFee
                !== "number"
        ) {

            alert(
                "Please select your delivery region."
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

*Delivery Region:*
${selectedRegion}

*City / Governorate:*
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
                message
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