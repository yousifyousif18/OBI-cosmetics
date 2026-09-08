const buyNowItem =
    JSON.parse(sessionStorage.getItem("buyNowItem"));


if (!buyNowItem) {

    alert("Please select a product to purchase.");

    window.location.href = "index.html";

} else {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");


    const product =
        products.find(function (product) {
            return product.id === buyNowItem.productId;
        });


    if (!product) {

        alert("Product could not be found.");

        window.location.href = "index.html";

    } else {

        const total =
            product.price * buyNowItem.quantity;


        checkoutItems.innerHTML = `
            <div class="checkout-item">

                <h3>${product.name}</h3>

                <p>
                    Shade: ${buyNowItem.shade}
                </p>

                <p>
                    Quantity: ${buyNowItem.quantity}
                </p>

                <p>
                    Price: LE ${product.price}
                </p>

            </div>
        `;


        checkoutTotal.textContent =
            "LE " + total;


        const checkoutForm =
            document.getElementById("checkout-form");


        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "customer-name"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "customer-phone"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "customer-address"
                    ).value.trim();


                const message = `
Hi there, I would like to place the following order: 


Product: ${product.name}
Shade: ${buyNowItem.shade}
Quantity: ${buyNowItem.quantity}
Price: LE ${product.price}

TOTAL: LE ${total}

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}

Delivery Address:
${address}

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

    }

}