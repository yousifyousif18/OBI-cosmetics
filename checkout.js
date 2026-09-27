const checkoutMode =
    sessionStorage.getItem("checkoutMode");


const checkoutItems =
    document.getElementById("checkout-items");



const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutDelivery =
    document.getElementById("checkout-delivery");

const checkoutTotal =
    document.getElementById("checkout-total");

const citySelect =
    document.getElementById("customer-city");

const areaSelect =
    document.getElementById("customer-area");

const checkoutForm =
    document.getElementById("checkout-form");


let orderItems = [];

let subtotal = 0;
let deliveryFee = 0;

let selectedCity = "";

let selectedArea = "";


/* =========================================
   BUY NOW CHECKOUT
========================================= */

if (checkoutMode === "buyNow") {

    const buyNowItem =
        JSON.parse(
            sessionStorage.getItem("buyNowItem")
        );


    if (!buyNowItem) {

        window.location.href = "index.html";

    } else {

        orderItems.push(buyNowItem);

    }

}


/* =========================================
   CART CHECKOUT
========================================= */

else if (checkoutMode === "cart") {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length === 0) {

        alert("Your cart is empty.");

        window.location.href = "index.html";

    } else {

        orderItems = cart;

    }

}


/* =========================================
   INVALID CHECKOUT
========================================= */

else {

    window.location.href = "index.html";

}


/* =========================================
   DISPLAY ORDER
========================================= */

function displayOrder() {

    checkoutItems.innerHTML = "";

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


            const itemTotal =
                product.price *
                item.quantity;


            subtotal += itemTotal;


            checkoutItems.innerHTML += `
                <div class="checkout-item">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Shade: ${item.shade}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        LE ${product.price} each
                    </p>

                    <strong>
                        LE ${itemTotal}
                    </strong>

                </div>
            `;

        }
    );


    checkoutSubtotal.textContent =
    "LE " + subtotal;


checkoutDelivery.textContent =
    "Select area";


checkoutTotal.textContent =
    "--";

}


displayOrder();
Object.keys(deliveryZones).forEach(
    function (city) {

        const option =
            document.createElement("option");

        option.value = city;

        option.textContent = city;

        citySelect.appendChild(option);

    }

);

/* =========================================
   CHECKOUT FORM
========================================= */

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();
        if (
    !selectedCity ||
    !selectedArea
        ) {

        alert(
        "Please select your delivery city and area."
        );

    return;
}
         const finalTotal =
           subtotal + deliveryFee;

        const name =
            document
                .getElementById("customer-name")
                .value
                .trim();


        const phone =
            document
                .getElementById("customer-phone")
                .value
                .trim();


        const address =
            document
                .getElementById("customer-address")
                .value
                .trim();


        let orderMessage = "";


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


                const itemTotal =
                    product.price *
                    item.quantity;


                orderMessage += `
${product.name}
Shade: ${item.shade}
Quantity: ${item.quantity}
Price: LE ${product.price}
Item total: LE ${itemTotal}

`;

            }
        );


        const message = `
Hi there, I would like to place the following order from Obi Cosmetics.

ORDER DETAILS

${orderMessage}

SUBTOTAL: LE ${subtotal}

DELIVERY

City: ${selectedCity}
Area: ${selectedArea}
Delivery Fee: LE ${deliveryFee}

FINAL TOTAL: LE ${finalTotal}

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}

Exact Delivery Address:
${address}

Please confirm the order and delivery details.
`;


        const encodedMessage =
            encodeURIComponent(message);


        const whatsappNumber =
            "601169390811";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        window.location.href =
            whatsappURL;

    }
);

citySelect.addEventListener(
    "change",
    function () {

        selectedCity =
            citySelect.value;


        selectedArea = "";

        deliveryFee = 0;


        areaSelect.innerHTML = `
            <option value="">
                Select your area
            </option>
        `;


        checkoutDelivery.textContent =
            "Select area";


        checkoutTotal.textContent =
            "--";


        if (!selectedCity) {

            areaSelect.disabled = true;

            return;
        }


        areaSelect.disabled = false;


        const areas =
            deliveryZones[selectedCity];


        areas.forEach(
            function (area) {

                const option =
                    document.createElement("option");


                option.value =
                    area.name;


                option.textContent =
                    `${area.name} — LE ${area.fee}`;


                areaSelect.appendChild(option);

            }
        );

    }
);
areaSelect.addEventListener(
    "change",
    function () {

        selectedArea =
            areaSelect.value;


        if (!selectedArea) {

            deliveryFee = 0;

            checkoutDelivery.textContent =
                "Select area";

            checkoutTotal.textContent =
                "--";

            return;
        }


        const area =
            deliveryZones[selectedCity]
                .find(
                    function (area) {

                        return (
                            area.name ===
                            selectedArea
                        );

                    }
                );


        deliveryFee =
            area.fee;


        updateFinalTotal();

    }
);
function updateFinalTotal() {

    const finalTotal =
        subtotal + deliveryFee;


    checkoutDelivery.textContent =
        "LE " + deliveryFee;


    checkoutTotal.textContent =
        "LE " + finalTotal;

}